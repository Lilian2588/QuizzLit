import { useState } from 'react'

export function useGameEngine(questions) {
  // --- 1. LES ÉTATS DU JEU ---
  const [gameState, setGameState] = useState('home') // 'home', 'playing', 'finished'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
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
      let FormattedUserValue = userValue.toLowerCase().trim()
      isCorrect = currentQuestion.accepted_inputs.includes(FormattedUserValue) || FormattedUserValue === currentQuestion.correct_answer_display.toLowerCase().trim()
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
    setShowExplanation(false) 
    if (currentIndex + 1 >= questions.length) {
      onSkipToEnd()
    } 
    // La sanction de la progression (1 faute = Game Over)
    else if (feedback === 'error' && config?.mode === 'progression') {
      onSkipToEnd()
    }    
    else {
      setCurrentIndex(i => i + 1)
    }
    setFeedback(null)
  }

  // Message de fin personnalisé
  const getMessage = (score, superMode) => {
    if (score === questions.length && questions.length > 0) return superMode ? " T'es parfaite !" : " Nice !";
    if (score / questions.length >= 0.5) return superMode ? "Tu pourrais mieux faire quand même je sais pas !" : "ça peut être encore mieux !";
    return superMode ? "Culturée, mmmh... laisse moi rire !" : "Dommage essaies encore ! ";
  };
  const getReaction = (score, superMode) => {
    if (score === questions.length && questions.length > 0) return superMode ? "💍" : "🤓";
    if (score / questions.length >= 0.5) return superMode ? "🤷🏼‍♂️" : "🤗";
    return superMode ? "🤠" : "🤔";
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
    showExplanation,  
    startGame,
    handleAnswer,
    nextQuestion,
    getMessage,
    onSkipToEnd, 
    getReaction,
    setShowExplanation
  }
}