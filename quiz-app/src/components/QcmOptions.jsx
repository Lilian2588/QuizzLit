export default function QcmOptions({ options, onAnswer, disabled }) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((option, index) => (
        <button 
          key={index} 
          onClick={() => onAnswer(option)}
          disabled={disabled}
          // w-full = prend toute la largeur, text-left = aligné à gauche (plus lisible), py-4 = gros pour le pouce
          className="w-full text-left px-5 py-4 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl font-medium text-gray-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {option}
        </button>
      ))}
    </div>
  )
}