import { useState } from 'react'
import Header from './Header'
import { playAudio } from '../utils/tools'


// 1. IMPORTATION DES ASSETS (Vite va comprendre tout seul où ils sont !)
// Assure-toi que les noms et les extensions correspondent exactement à tes fichiers
import imageBravo from '../assets/images/bravo-photo.jpeg'
import audioBravo from '../assets/audios/bravo.mp3'

export default function EndProgressionScreen({ 
  handleShowProgression,
  GoMenu
}) {
  
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayAudio = async () => {
    if (isPlaying) return
    setIsPlaying(true)
    await playAudio(audioBravo)
    setIsPlaying(false)
  }

  return (
    <>
      <Header onHome={GoMenu} onProgression={handleShowProgression} showHomeButton={false} />
      
      <div 
        className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in overflow-y-auto custom-scrollbar"
        style={{ paddingTop: '100px', paddingBottom: '40px' }}
      >
        
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 mt-4">
          🐯 T'y es un tigre !
        </h2>

        {/* Photo de l'utilisateur */}
        <div className="w-40 h-40 shrink-0 rounded-full overflow-hidden mb-6 border-4 border-yellow-400 shadow-lg">
          {/* On utilise la variable importée ! */}
          <img 
            src={imageBravo} 
            alt="T'y es belle" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bouton vocal */}
        <button 
          onClick={handlePlayAudio}
          className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center text-3xl mb-8 transition-all shadow-md active:scale-95 ${
            isPlaying 
              ? 'bg-green-500 text-white animate-pulse' 
              : 'bg-yellow-400 hover:bg-yellow-500 text-white'
          }`}
        >
          {isPlaying ? '🔊' : '🎵'}
        </button>

        {/* Boutons (mt-auto pour les pousser vers le bas s'il y a de la place) */}
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