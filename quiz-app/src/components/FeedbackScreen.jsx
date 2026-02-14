import { getRandomFeedback } from '../utils/feedbackMessages'

export default function FeedbackScreen({ isSuccess, correctAnswer, onNext }) {
  const feedbackMessage = getRandomFeedback(isSuccess)

  return (
    <div className={`mt-6 p-6 rounded-xl border-2 text-center animate-fade-in ${
      isSuccess ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
    }`}>
      
      <h3 className={`text-xl font-extrabold mb-2 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
        {feedbackMessage}
      </h3>
      
      {!isSuccess && (
        <p className="text-gray-700 mb-4">
          La bonne réponse était : <br/>
          <strong className="text-lg text-gray-900">{correctAnswer}</strong>
        </p>
      )}
      
      <button 
        onClick={onNext}
        className={`w-full font-bold py-3 rounded-lg mt-2 active:scale-95 transition-transform ${
          isSuccess ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-red-600 text-white hover:bg-red-700'
        }`}
      >
        Continuer →
      </button>

    </div>
  )
}