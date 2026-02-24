import { useEffect, useState } from 'react'
import Header from './Header'
import { playAudio,  getSecureMediaUrl } from '../utils/tools'
import { useUserRole } from '../hooks/useUserRole'

export default function EndScreen({ 
  score, total, onReplay, GoMenu, 
  levelId, markLevelCompleted, 
  hasNextLevel, onNextLevel, handleShowProgression, getMessage, getReaction,
  goToEndProgressionScreen
}) {
  const { isSuper, secretKey } = useUserRole()
  const isPerfect = score === total && total > 0;
  const [isLoading, setIsLoading] = useState(!!(isPerfect && levelId && isSuper && secretKey))
  useEffect(() => {
    if (isPerfect && levelId) markLevelCompleted(levelId);
  }, [isPerfect, levelId, markLevelCompleted])

  useEffect(() => {
    const loadSuperMedia = async () => {
      if (isPerfect && levelId && isSuper && secretKey) {
        setIsLoading(true) 
        const url = await getSecureMediaUrl('audios/FinDePalier.mp3', secretKey)
        if (url) playAudio(url)
        setIsLoading(false)
      }
    }
    loadSuperMedia()
  }, [isPerfect, levelId])
  if (isLoading) {
    return (
      <>
        <Header onHome={GoMenu} onProgression={handleShowProgression} showHomeButton={false} />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-pulse" style={{ paddingTop: '100px' }}>
          <div className="text-4xl mb-4">⏳</div>
          <p className="font-bold text-gray-500">Is Loading fort laaa</p>
        </div>
      </>
    )
  }
  return (
    <>
      <Header onHome={GoMenu} onProgression={handleShowProgression} showHomeButton={false}  />
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in" style={{ paddingTop: '15px' }}>
        
        {isPerfect && levelId ? (
          <div className="text-6xl mb-4 drop-shadow-md animate-bounce">{isSuper ? '👩🏻✨' : '🎉'}</div>
        ) : (
          <div className="text-6xl mb-4 mt-2 drop-shadow-md">{getReaction(score, isSuper)}</div>
        )}
        
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">{getMessage(score, isSuper)}</h2>
        
        {isPerfect && levelId && (
          <p className="text-green-600 font-bold mb-4 bg-green-100 p-2 rounded-lg">
            Nouveau palier débloqué ! ✅
          </p>
        )}
        
        <div className="bg-blue-50 w-full py-6 rounded-2xl mb-8 border border-blue-100">
          <p className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-1">
            Ton score final
          </p>
          <p className="text-4xl font-black text-blue-600">
            {score} <span className="text-2xl text-blue-300">/ {total}</span>
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          
          {/* Palier suivant (si disponible) */}
          {isPerfect && levelId && hasNextLevel && (
            <button 
              onClick={onNextLevel}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl transition-all shadow-md active:scale-95 text-lg border-2 border-green-700"
            >
              ⏩ Palier Suivant
            </button>
          )}

          {/* Theme terminé - aller à l'écran de félicitations */}
          {isPerfect && levelId && !hasNextLevel && goToEndProgressionScreen && (
            <button 
              onClick={goToEndProgressionScreen}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-black py-4 rounded-xl transition-all shadow-md active:scale-95 text-lg border-2 border-yellow-500"
            >
              {isSuper ? '😏 Terminer le thème' : '✅ Terminer le thème'}
            </button>
          )}

          <button onClick={onReplay} className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-95">
            🔄 Rejouer la partie 
          </button>
          <button onClick={levelId ? handleShowProgression : GoMenu} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-xl transition-all active:scale-95">
            {levelId ? '📈 Retour à la progression' : '🏠 Retour au Menu'}
          </button>
        </div>
      </div>
    </>
  )
}