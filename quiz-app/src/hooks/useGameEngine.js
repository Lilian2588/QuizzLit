import { useState } from 'react'

export function useGameEngine(questions) {
  // --- 1. LES ÉTATS DU JEU ---
  const [gameState, setGameState] = useState('home') // 'home', 'playing', 'finished'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  // Variables calculées
  const currentQuestion = questions ? questions[currentIndex] : null

  // --- 2. LES ACTIONS DU JOUEUR ---
  const startGame = () => {
    setGameState('playing')
  }

  const handleAnswer = (userValue) => {
    if (!currentQuestion) return

    let isCorrect = false
    
    // Règle de validation
    if (currentQuestion.question_type === 'QCM') {
      isCorrect = userValue === currentQuestion.correct_answer_display
    } else {
      isCorrect = currentQuestion.accepted_inputs.includes(userValue.toLowerCase().trim())
    }

    // Mise à jour du score et du feedback
    if (isCorrect) {
      setScore(s => s + 1)
      setFeedback('success')
    } else {
      setFeedback('error')
    }
  }

  const nextQuestion = () => {
    setFeedback(null)
    // Si on est à la dernière question, on termine
    if (currentIndex + 1 >= questions.length) {
      setGameState('finished')
    } else {
      setCurrentIndex(i => i + 1)
    }
  }

  const restartGame = () => {
    setCurrentIndex(0)
    setScore(0)
    setFeedback(null)
    setGameState('home')
  }

  // --- 3. ON EXPORTE CE QUI EST UTILE À L'INTERFACE ---
  return {
    gameState,
    currentQuestion,
    currentIndex,
    score,
    feedback,
    startGame,
    handleAnswer,
    nextQuestion,
    restartGame
  }
}