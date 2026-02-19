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
    setCurrentIndex(0)
    setScore(0)
    setFeedback(null)
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

  const nextQuestion = (config) => {
    // Si on est à la dernière question, on termine
    if (currentIndex + 1 >= questions.length) {
      onSkipToEnd()
    } 
    // Si on est en mode progression et qu'on a eu une mauvaise réponse, on termine
    else if (feedback === 'error' && config && config.mode === "progression") {
      onSkipToEnd()
    } 
    else {
      setCurrentIndex(i => i + 1)
    }
    setFeedback(null)
  }

  // Message de fin personnalisé
  const getMessage = (score) => {
    if (score === questions.length && questions.length > 0) return "T'es parfaite ! 💍";
    if (score / questions.length >= 0.5) return "Tu pourrais mieux faire quand même je sais pas ! 🤷‍♂️";
    return "Culturée, mmmh... laisse moi rire ! 🤠";
  };

  const onSkipToEnd = () => {
    // Passer directement à l'écran de fin
    setGameState('finished')
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
    getMessage,
    onSkipToEnd 
  }
}