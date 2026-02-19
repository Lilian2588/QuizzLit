import { useState, useEffect } from 'react'

export function useProgression() {
  // On charge les données sauvegardées (ou un objet vide par défaut)
  const [completedLevels, setCompletedLevels] = useState(() => {
    const saved = localStorage.getItem('quiz_progression')
    return saved ? JSON.parse(saved) : {}
  })

  // Dès que ça change, on sauvegarde dans le téléphone
  useEffect(() => {
    localStorage.setItem('quiz_progression', JSON.stringify(completedLevels))
  }, [completedLevels])

  // Fonction pour valider un niveau (appelée quand score == total)
  const markLevelCompleted = (levelId) => {
    setCompletedLevels(prev => ({
      ...prev,
      [levelId]: true
    }))
  }

  // Fonction pour réinitialiser (optionnel, pour les tests)
  const resetProgression = () => setCompletedLevels({})

  return { completedLevels, markLevelCompleted, resetProgression }
}