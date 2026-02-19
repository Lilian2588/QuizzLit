import Header from './Header'
import Footer from './Footer'
import QcmOptions from './QcmOptions'
import InputForm from './InputForm'
import FeedbackScreen from './FeedbackScreen'

export default function GameScreen({
  currentQuestion,
  currentIndex,
  totalQuestions,
  score,
  feedback,
  handleAnswer,
  nextQuestion,
  GoMenu,
  handleShowProgression,
  onSkipToEnd
}) {
  // Petit bonus UX : Si la question est une longue citation (Expert), on adapte le style
  const isLongText = currentQuestion.content_payload.length > 150

  return (
    <>
      <Header 
        onHome={GoMenu}
        onProgression={handleShowProgression}
        showHomeButton={true}
      />
      
      <div className="flex-1 flex flex-col p-6 animate-fade-in" style={{ paddingTop: '40px' }}>
        
        {/* Header de la question (Score + Difficulté) */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
              <span className="text-green-600 text-sm">✅ Bonnes réponses </span>
              <span className="font-bold text-green-700">{score}/{totalQuestions}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">                 
            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
              currentQuestion.difficulty === 'BEGINNER' ? 'bg-green-100 text-green-700' :
              currentQuestion.difficulty === 'INTERMEDIATE' ? 'bg-orange-100 text-orange-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentQuestion.difficulty}
            </span>                            
          </div>
        </div>

        {/* La Question / Citation */}
        <h2 className={`font-bold text-gray-800 mb-6 leading-relaxed ${
          isLongText ? 'text-lg italic border-l-4 border-blue-500 pl-4 text-gray-700' : 'text-xl'
        }`}>
          {currentIndex + 1}. {currentQuestion.content_payload}
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

        {/* Feedback (Overlay) */}
        {feedback && (
          <FeedbackScreen 
            isSuccess={feedback === 'success'}
            correctAnswer={currentQuestion.correct_answer_display}
            onNext={nextQuestion}
          />
        )}
      </div>

      {/* Footer avec bouton "Aller à la fin" */}
      <Footer onSkipToEnd={onSkipToEnd} />
    </>
  )
}