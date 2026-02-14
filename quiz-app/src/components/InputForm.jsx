import { useState } from 'react'

export default function InputForm({ onAnswer, disabled }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim() || disabled) return
    onAnswer(inputValue)
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input 
        type="text" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={disabled}
        placeholder="Votre réponse ici..."
        // focus:ring-2 = effet de focus propre quand on tape au clavier
        className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all disabled:opacity-50"
      />
      <button 
        type="submit" 
        disabled={disabled}
        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl active:scale-[0.98] transition-transform disabled:opacity-50 disabled:bg-gray-400"
      >
        Valider
      </button>
    </form>
  )
}