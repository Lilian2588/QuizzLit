import { useState, useEffect } from 'react'
import Header from './Header'
import { playAudio, getSecureMediaUrl } from '../utils/tools'
import { useUserRole } from '../hooks/useUserRole'
import { useProgression } from '../hooks/useProgression'
import confetti from 'canvas-confetti'

export default function EndProgressionScreen({ 
  handleShowProgression,
  GoMenu
}) {
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAudioLoading, setIsAudioLoading] = useState(false) 

  const { isSuper, secretKey } = useUserRole()
  const { completedLevels } = useProgression()
  
  const literatureCompleted = Object.keys(completedLevels).filter(k => k.startsWith('LITERATURE')).length >= 6
  const cinemaCompleted = Object.keys(completedLevels).filter(k => k.startsWith('CINEMA')).length >= 6
  const completedThemesCount = (literatureCompleted ? 1 : 0) + (cinemaCompleted ? 1 : 0)
  const isUltimateFinish = completedThemesCount === 2

  const [secureImage, setSecureImage] = useState(null)
  const [isLoading, setIsLoading] = useState(!!(isSuper && secretKey))

  useEffect(() => {
    const loadSuperMedia = async () => {
      if (isSuper && secretKey) {
        setIsLoading(true)         
        const imageFilename = isUltimateFinish ? 'images/bravo2-photo.jpeg' : 'images/bravo-photo.jpeg'
        const imgUrl = await getSecureMediaUrl(imageFilename, secretKey)        
        if (imgUrl) setSecureImage(imgUrl)
        setIsLoading(false)        
        if (imgUrl) {
          confetti({
            particleCount: isUltimateFinish ? 500 : 300,
            spread: isUltimateFinish ? 160 : 100,         
            origin: { y: 0.6 }, 
            colors: ['#FBBF24', '#3B82F6', '#10B981', '#EF4444', '#8B5CF6'], 
            zIndex: 100         
          })
        }
      }
    }
    loadSuperMedia()
  }, [isSuper, secretKey, isUltimateFinish])

  const handlePlayAudio = async () => {
    if (isPlaying || isAudioLoading) return 
    setIsAudioLoading(true) 
    const audioFilename = isUltimateFinish ? 'audios/bravo2.mp3' : 'audios/bravo.mp3'
    const audioUrl = await getSecureMediaUrl(audioFilename, secretKey)
    setIsAudioLoading(false)     
    if (audioUrl) {
      setIsPlaying(true)
      await playAudio(audioUrl)
      setIsPlaying(false)
    }
  }

  if (isLoading) {
    return (
      <>
        <Header onHome={GoMenu} onProgression={handleShowProgression} showHomeButton={false} />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-pulse" style={{ paddingTop: '100px' }}>
          <div className="text-4xl mb-4">⏳</div>
          <p className="font-bold text-gray-500">Préparation bb 2sec...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Header onHome={GoMenu} onProgression={handleShowProgression} showHomeButton={false} />      
      <div 
        className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in overflow-y-auto custom-scrollbar"
        style={{ paddingTop: '100px', paddingBottom: '40px' }}
      >        
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 mt-4">
          {!secureImage 
            ? "🎉 Incroyable !" 
            : isUltimateFinish 
              ? "👑 T'es la Reine du Quizz !" 
              : "🐯 T'y es un tigre !"}
        </h2>

        {secureImage && (
          <>
            <div className={`w-40 h-40 shrink-0 rounded-full overflow-hidden mb-6 border-4 shadow-lg ${isUltimateFinish ? 'border-pink-500 shadow-pink-200' : 'border-yellow-400'}`}>
              <img src={secureImage} alt="T'y es belle" className="w-full h-full object-cover" />
            </div>
            <button 
              onClick={handlePlayAudio}
              disabled={isAudioLoading || isPlaying} 
              className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center text-3xl mb-8 transition-all shadow-md active:scale-95 ${
                isPlaying || isAudioLoading
                  ? 'bg-green-500 text-white animate-pulse' 
                  : isUltimateFinish ? 'bg-pink-500 hover:bg-pink-600 text-white' : 'bg-yellow-400 hover:bg-yellow-500 text-white'
              }`}
            >
              {isAudioLoading ? '⏳' : isPlaying ? '🔊' : '🎵'}
            </button>
          </>
        )}

        {!secureImage && (
          <div className="text-8xl mb-12 drop-shadow-lg">🏆</div>
        )}

        <div className="w-full flex flex-col gap-3 mt-auto">
          <button 
            onClick={handleShowProgression} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-95"
          >
            📈 Retour à la Progression
          </button>
          <button 
            onClick={GoMenu} 
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-xl transition-all active:scale-95"
          >
            🏠 Retour au Menu
          </button>
        </div>

      </div>
    </>
  )
}