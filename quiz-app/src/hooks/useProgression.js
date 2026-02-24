import { useState, useEffect, useCallback } from 'react'

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

  const markLevelCompleted = useCallback((levelId) => {
    setCompletedLevels(prev => {
      // Si le niveau est DÉJÀ enregistré comme terminé, on ne change rien !
      if (prev[levelId]) {
        return prev; 
      }
      return {
        ...prev,
        [levelId]: true
      }
    })
  }, [])

  // Fonction pour réinitialiser (optionnel, pour les tests)
  const resetProgression = useCallback(() => setCompletedLevels({}), [])

  return { completedLevels, markLevelCompleted, resetProgression }
}