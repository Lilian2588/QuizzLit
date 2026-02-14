import Header from './Header'

export default function EndScreen({ score, total, onRestart }) {
  // Petit bonus logique : un message différent selon le score
  const getMessage = () => {
    const percentage = score / total;
    if (percentage === 1) return "T'es parfaite ! 💍";
    if (percentage >= 0.5) return "Tu pourrais mieux faire quand même je sais pas ! 🤷‍♂️";
    return "Culturée, mmmh... laisse moi rire ! 🤠";
  };

  return (
    <>
      <Header showHomeButton={false} />
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in" style={{ paddingTop: '80px' }}>
      <div className="text-6xl mb-4 drop-shadow-md">🏆</div>
      <h2 className="text-2xl font-extrabold text-gray-800 mb-2">{getMessage()}</h2>
      
      <div className="bg-blue-50 w-full py-6 rounded-2xl mb-8 border border-blue-100">
        <p className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-1">
          Ton score final
        </p>
        <p className="text-4xl font-black text-blue-600">
          {score} <span className="text-2xl text-blue-300">/ {total}</span>
        </p>
      </div>

      <button 
        onClick={onRestart}
        className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-95"
      >
        Rejouer la partie 
      </button>
    </div>
    </>
  )
}
