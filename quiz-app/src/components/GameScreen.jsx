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
  onSkipToEnd, 
  showExplanation,
  setShowExplanation
}) {


  // Petit bonus UX : Si la question est une longue citation (Expert), on adapte le style
const isCitation = currentQuestion.content_payload >= 150 || /["']([^"']{55,})["']/.test(currentQuestion.content_payload);  
  return (
    <>     
      <div className="flex-1 flex flex-col p-6 animate-fade-in overflow-y-auto pb-5 custom-scrollbar" style={{ paddingTop: '30px' }}>
        
        {/* Header de la question (Score + Difficulté) */}         
        <div className="flex justify-end mb-2">
          <button onClick={GoMenu}
            className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 text-red-700 font-bold px-2 py-1 rounded-lg hover:from-red-100 hover:to-orange-100 transition-all transform hover:scale-105 text-xs">
            Quitter
          </button>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
              <span className="text-green-600 text-sm">✅</span>
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
          isCitation ? 'text-lg italic border-l-4 border-blue-500 pl-4 text-gray-700' : 'text-xl'
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
        
        {/* LE FEEDBACK EN OVERLAY  */}
        {feedback && !showExplanation && (
        <div className="fixed bottom-1/3 left-1/2 -translate-x-1/2 w-full max-w-md z-[100] animate-slide-up shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          <FeedbackScreen 
            isSuccess={feedback === 'success'}
            correctAnswer={currentQuestion.correct_answer_display}
            onNext={nextQuestion}
            currentThemeQuestion={currentQuestion.theme}
          />
        </div>
        )}
          
        {/* --- ZONE D'EXPLICATION --- */}
        {feedback !== null && currentQuestion.explanation && (
          <div className="mt-6 flex flex-col items-center w-full max-w-md mx-auto relative z-50">
            {!showExplanation ? (
              <button 
                onClick={() => setShowExplanation(true)}
                className="text-sm bg-blue-100 text-blue-700 font-bold px-6 py-3 rounded-full hover:bg-blue-200 transition-all active:scale-95 flex items-center gap-2 shadow-sm pointer-events-auto"
              >
                ❓ En savoir plus
              </button>
            ) : (
              /* Ajout de transition-all et overflow-hidden pour une ouverture fluide */
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-900 animate-fade-in w-full text-left shadow-lg pointer-events-auto transition-all duration-300 ease-in-out">
                <span className="font-extrabold text-blue-800 flex items-center gap-2 mb-3 border-b border-blue-200 pb-2">
                  💡 Le savais-tu ? 
                </span>
                <p className="leading-relaxed whitespace-pre-wrap text-blue-900/90 font-medium">
                  {currentQuestion.explanation}
                </p>
            
                <button 
                  onClick={nextQuestion}
                  className={`"text-sm bg-blue-100 text-blue-700 font-bold px-6 py-3 my-4 rounded-full hover:bg-blue-200 transition-all active:scale-95 flex items-center gap-2 shadow-sm pointer-events-auto"`}>
                  Continuer →
                </button>
              </div>
            )}            
          </div>
        )}        
      </div>    
      {/* Footer avec bouton "Aller à la fin" 
      <Footer onSkipToEnd={onSkipToEnd} />
      */}
    </>
  )
}