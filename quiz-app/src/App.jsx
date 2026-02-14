import { useQuestions } from './hooks/useQuestions'
import { useGameEngine } from './hooks/useGameEngine'
import Header from './components/Header'
import HomeScreen from './components/HomeScreen'
import EndScreen from './components/EndScreen'
import QcmOptions from './components/QcmOptions'
import InputForm from './components/InputForm'
import FeedbackScreen from './components/FeedbackScreen'

function App() {
  // 1. Récupération des données (Data Layer)
  const { questions, isLoading, error } = useQuestions()
  
  // 2. Initialisation du moteur de jeu (Logic Layer)
  const {
    gameState,
    currentQuestion,
    currentIndex,
    score,
    feedback,
    startGame,
    handleAnswer,
    nextQuestion,
    restartGame
  } = useGameEngine(questions) // On passe les questions au moteur

  // 3. Gestion des états de chargement (UI Layer)
  if (isLoading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center font-bold text-gray-400">Chargement de la bibliothèque...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center p-4 text-red-500 font-bold">Erreur : {error}</div>

  // 4. Rendu de l'application (UI Layer)
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden min-h-[500px] flex flex-col relative border border-gray-100">
        
        {/* ÉCRAN 1 : ACCUEIL */}
        {gameState === 'home' && (
          <HomeScreen onStart={startGame} />
        )}

        {/* ÉCRAN 2 : EN JEU */}
        {gameState === 'playing' && currentQuestion && (
          <>
            <Header 
              onHome={restartGame}
              showHomeButton={true}
              currentQuestion={currentIndex + 1}
              totalQuestions={questions.length}
            />
            <div className="flex-1 flex flex-col p-6 animate-fade-in" style={{ paddingTop: '40px' }}>
              {/* Header de la question */}
              <div className="flex justify-between items-center mb-6">
                 {/* Indicateur de score en bas de la question */}
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                      <span className="text-green-600 text-sm">✅ Bonnes réponses </span>
                      <span className="font-bold text-green-700">{score}/{questions.length}</span>
                    </div>
                  </div>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider"></span>
                <div className="flex items-center gap-2">                 
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    currentQuestion.difficulty === 'BEGINNER' ? 'bg-green-100 text-green-700' :
                    currentQuestion.difficulty === 'INTERMEDIATE' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>                            
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
                {currentQuestion.content_payload}
              </h2>

              {/* Moteur de réponse */}
              <div className="mt-auto">
                {currentQuestion.question_type === 'QCM' ? (
                  <QcmOptions 
                    options={[currentQuestion.correct_answer_display, ...currentQuestion.distractors]} 
                    onAnswer={handleAnswer}
                    disabled={feedback !== null}
                  />
                ) : (
                  <InputForm onAnswer={handleAnswer} disabled={feedback !== null} />
                )}
              </div>

              {/* Feedback */}
              {feedback && (
                <FeedbackScreen 
                  isSuccess={feedback === 'success'}
                  correctAnswer={currentQuestion.correct_answer_display}
                  onNext={nextQuestion}
                />
              )}
            </div>
          </>
        )}

        {/* ÉCRAN 3 : FIN */}
        {gameState === 'finished' && (
          <EndScreen 
            score={score} 
            total={questions.length} 
            onRestart={restartGame} 
          />
        )}

      </div>
    </div>
  )
}

export default App