import { useState, useEffect } from 'react'
import Header from './Header'
import { playAudio } from '../utils/tools'
import { useUserRole } from '../hooks/useUserRole'
import confetti from 'canvas-confetti'

export default function EndProgressionScreen({ 
  handleShowProgression,
  GoMenu
}) {
  
  const [isPlaying, setIsPlaying] = useState(false)
  const { isSuper, secretKey } = useUserRole()
  
  // États pour stocker les URLs sécurisées temporaires
  const [secureImage, setSecureImage] = useState(null)
  const [secureAudio, setSecureAudio] = useState(null)

  const [isLoading, setIsLoading] = useState(!!(isSuper && secretKey))

  const fetchSecureMedia = async (filename) => {
    try {
      // Demander médias sécurisés au serveur
      const res = await fetch('/api/getUrl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: secretKey, filename: filename})
      })
      if (!res.ok) throw new Error(`Erreur API: status ${res.status}`)
      const data = await res.json() // On retourne les données (URL signée) au composant
      return data
    } catch (err) {
      console.error("Impossible de récupérer le média sécurisé", err)
      return null
    }
  }
  
  useEffect(() => {
    const loadSuperMedia = async () => {
      if (isSuper && secretKey) {
        setIsLoading(true) 
        const [imageData, audioData] = await Promise.all([
          fetchSecureMedia('images/bravo-photo.jpeg'), 
          fetchSecureMedia('audios/bravo.mp3')
        ])
        if (imageData && imageData.signedUrl) setSecureImage(imageData.signedUrl)
        if (audioData && audioData.signedUrl) setSecureAudio(audioData.signedUrl)
        setIsLoading(false)
        if (imageData && imageData.signedUrl) {
          confetti({
            particleCount: 300, // Nombre de confettis
            spread: 100,         // L'angle de l'explosion
            origin: { y: 0.6 }, // L'explosion part du milieu/bas de l'écran
            colors: ['#FBBF24', '#3B82F6', '#10B981', '#EF4444', '#8B5CF6'], // Tes couleurs
            zIndex: 100         // Pour être sûr qu'ils passent au-dessus du reste
          })
        }
      }
    }
    loadSuperMedia()
  }, [isSuper, secretKey])

    const handlePlayAudio = async () => {
      if (isPlaying || !secureAudio) return
      setIsPlaying(true)
      await playAudio(secureAudio)
      setIsPlaying(false)
    }

  // --- 1. AFFICHAGE DU CHARGEMENT (Seulement en Super Mode) ---
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
        
        {/* Titre dynamique : Tigre pour elle, Incroyable pour les autres */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 mt-4">
          {secureImage ? "🐯 T'y es un tigre !" : "🎉 Incroyable !"}
        </h2>

        {/* --- CONTENU SECRET (Seulement si l'image sécurisée a été chargée) --- */}
        {secureImage && (
          <>
            {/* Photo de l'utilisateur sécurisée */}
            <div className="w-40 h-40 shrink-0 rounded-full overflow-hidden mb-6 border-4 border-yellow-400 shadow-lg">
              <img 
                src={secureImage} 
                alt="T'y es belle" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bouton vocal sécurisé */}
            <button 
              onClick={handlePlayAudio}
              disabled={!secureAudio} // On grise le bouton si le son n'est pas encore prêt
              className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center text-3xl mb-8 transition-all shadow-md active:scale-95 ${
                isPlaying 
                  ? 'bg-green-500 text-white animate-pulse' 
                  : 'bg-yellow-400 hover:bg-yellow-500 text-white'
              }`}
            >
              {isPlaying ? '🔊' : '🎵'}
            </button>
          </>
        )}

        {/* --- CONTENU VISITEUR (Si pas de mode Super) --- */}
        {!secureImage && (
          <div className="text-8xl mb-12 drop-shadow-lg">🏆</div>
        )}

        {/* --- BOUTONS COMMUNS --- */}
        {/* mt-auto pour les pousser vers le bas s'il y a de la place */}
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