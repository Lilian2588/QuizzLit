import { useState } from 'react'
import { useQuestions } from './useQuestions'
import { useGameEngine } from './useGameEngine'

export function useGameSession() {
  const [gameConfig, setGameConfig] = useState(null)
  const [reloadTrigger, setReloadTrigger] = useState(0) // Le compteur pour forcer le rechargement

  const { questions, isLoading, error } = useQuestions(gameConfig, reloadTrigger)
  const engine = useGameEngine(questions, gameConfig)

  const launchSession = (config) => {
    setGameConfig(config)
    engine.startGame()
  }

  // Rejouer avec les mêmes paramètres
  const replaySession = () => {
    setReloadTrigger(prev => prev + 1) // Force useQuestions à remélanger
    engine.startGame() // Remet le score à zéro
  }

  // Quitter pour revenir au menu
  const quitSession = () => {
    setGameConfig(null)
  }

  return {
    gameConfig, isLoading, error, questions,
    engine, launchSession, replaySession, quitSession
  }
}