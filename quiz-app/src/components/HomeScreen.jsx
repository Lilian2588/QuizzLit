export default function HomeScreen({ onStart }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-2 tracking-tight">QuizLit</h1>
      <p className="text-gray-500 mb-8 font-medium">Testez votre culture littéraire et cinématographique.</p>
      
      <button 
        onClick={onStart}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
      >
        Démarrer le Quiz
      </button>
    </div>
  )
}