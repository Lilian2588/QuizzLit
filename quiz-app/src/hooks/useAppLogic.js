import { useState, useEffect } from 'react'
import { useGameSession } from './useGameSession'
import { useProgression } from './useProgression'

// On exporte la structure pour pouvoir s'en servir aussi dans le Dashboard visuel !
export const PROGRESSION_STRUCTURE = [
  { diff: 'BEGINNER', type: 'QCM', label: 'Débutant QCM' },
  { diff: 'BEGINNER', type: 'INPUT', label: 'Débutant Saisie' },
  { diff: 'INTERMEDIATE', type: 'QCM', label: 'Initié QCM' },
  { diff: 'INTERMEDIATE', type: 'INPUT', label: 'Initié Saisie' },
  { diff: 'EXPERT', type: 'QCM', label: 'Expert QCM' },
  { diff: 'EXPERT', type: 'INPUT', label: 'Expert Saisie' }
]

export function useAppLogic() {
  const { gameConfig, isLoading, error, questions, engine, launchSession, replaySession, quitSession} = useGameSession()
  const { completedLevels, markLevelCompleted } = useProgression()
  const [showMap, setShowMap] = useState(false)
  const [showEndProgression, setShowEndProgression] = useState(false)
  const [showNokeyScreen, setShowNokeyScreen] = useState(false)
  
  const onClose = () => setShowNokeyScreen(false)
  const handleOpen = () => setShowNokeyScreen(true)

  // On écoute le signal envoyé par l'appui long
  useEffect(() => {
    window.addEventListener('openNokeyScreen', handleOpen)
    return () => window.removeEventListener('openNokeyScreen', handleOpen)
  }, [])

  const handleShowProgression = () => {
    quitSession() 
    setShowEndProgression(false)
    setShowMap(true)
  }
  
  const handleHomeStart = (config) => {
    if (config.mode === 'progression') handleShowProgression()
    else launchSession(config)
  }

  const handleLaunchFromMap = (levelConfig) => {
    setShowMap(false)
    setShowEndProgression(false)
    launchSession(levelConfig)
  }

  const handleReturnToMenu = () => {
    quitSession()
    setShowMap(false)
    setShowEndProgression(false)
  }

  const goToEndProgressionScreen = () =>{
    quitSession()
    setShowEndProgression(true)
  } 

  let hasNextLevel = false
  let handleNextLevel = null
  // --- LOGIQUE DU "PALIER SUIVANT" ---
  // Si on est en mode progression et qu'on connaît le niveau actuel (ex: "CINEMA_BEGINNER_QCM")
  if (gameConfig && gameConfig.mode === 'progression' && gameConfig.levelId) {
    const [theme, diff, type] = gameConfig.levelId.split('_') // On découpe l'ID
    
    // On cherche où on est dans le tableau
    const currentIndex = PROGRESSION_STRUCTURE.findIndex(s => s.diff === diff && s.type === type)
    
    // S'il y a un niveau après nous
    if (currentIndex >= 0 && currentIndex < PROGRESSION_STRUCTURE.length - 1) {
      hasNextLevel = true
      const nextStep = PROGRESSION_STRUCTURE[currentIndex + 1]
      const nextLevelId = `${theme}_${nextStep.diff}_${nextStep.type}`
      
      // La fonction qui lance directement le niveau suivant
      handleNextLevel = () => {
        launchSession({
          mode: 'progression',
          themes: [theme],
          types: [nextStep.type],
          difficulty: nextStep.diff,
          levelId: nextLevelId
        })
      }
    } else {
      // C'est le dernier palier du thème - on peut aller à l'écran de fin de progression
      goToEndProgressionScreen()
    }
  }

  return {
    gameConfig, isLoading, error, questions, engine,
    completedLevels, markLevelCompleted, showMap,
    handleHomeStart, handleLaunchFromMap, handleReturnToMenu, replaySession,
    hasNextLevel, handleNextLevel, handleShowProgression,
    showEndProgression, goToEndProgressionScreen, showNokeyScreen, onClose, handleOpen
  }
}
