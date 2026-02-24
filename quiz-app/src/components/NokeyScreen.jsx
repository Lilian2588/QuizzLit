import { useState } from 'react'
import { useUserRole } from '../hooks/useUserRole'

export default function NokeyScreen({ onClose }) {
  const [step, setStep] = useState(1) 
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const { unlockSuperMode } = useUserRole()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password.toLowerCase().trim() === 'pepette') {
      unlockSuperMode(password.trim())
      setStep(2)
    } else {
      setError(true)
      setPassword('') 
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500 bg-pink-50 w-full rounded-3xl">
      
      {step === 1 && (
        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center">
          <div className="text-6xl mb-6">🤫</div>
          <h2 className="text-2xl font-black text-gray-800 mb-2">Accès Restreint</h2>
          <p className="text-gray-500 mb-8 font-medium">Quel est le mot magique ?</p>
          
          <input 
            type="password" 
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(false)
            }}
            placeholder="Mot de passe..."
            className={`w-full px-4 py-4 rounded-xl text-center text-lg font-bold border-2 outline-none transition-all ${
              error ? 'border-red-400 bg-red-50 text-red-600' : 'border-gray-200 focus:border-pink-400 focus:ring-4 ring-pink-100'
            }`}
          />
          
          {error && <p className="text-red-500 text-sm mt-3 font-bold animate-bounce">T'es qui toi ? Mauvais code ! 🤨</p>}

          <button 
            type="submit"
            className="mt-6 w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-95"
          >
            Valider
          </button>
          
          {/* Bouton pour annuler si elle a cliqué par erreur */}
          <button type="button" onClick={onClose} className="mt-4 text-gray-400 text-sm font-bold underline">
            Retour
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="w-full max-w-sm flex flex-col items-center animate-in zoom-in duration-700">
          <div className="text-6xl mb-6">🧖🏻‍♀️💌</div>
          {/* --- LA LETTRE MANUSCRITE --- */}
          <div className="relative bg-[#fdfbf7] p-8 rounded-sm shadow-xl border border-gray-200 mb-8 w-full transform rotate-1">
            
            {/* Le petit bout de "scotch" rose en haut au milieu */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-pink-200/60 -rotate-3"></div>
            
            {/* Le contenu de la lettre */}
            <div className="flex flex-col gap-5 text-gray-700 font-serif leading-relaxed text-left">
                <p className="text-left text-lg font-bold text-pink-500 mt-2 italic">
                Cher Zozo,
                </p>
                <p>
                    Joyeux anniversaire en retard, je te demande mon pardon. 🤍
                </p>

                <p>
                     Du coup quoi de mieux qu'un ptit quizz de littérature et de cinéma. Deux modes, un mode <span className="font-semibold italic">Freestyle</span> où tu peux sélectionner quel type de question tu veux et un mode <span className="font-semibold italic">Progression</span> qui sont des paliers de questions à franchir dans chacun des thèmes. J'espère simplement que ce sera pas trop facile pour toi.
                </p>

                <p>
                    Montre-moi que t'es bien une personne ultraaaa culturée (ou pas 🤠). Y'aura peut-être des refs à "Des Souris et des Hommes", qui sait.
                </p>

                {/* La signature alignée à droite */}
                <p className="text-right text-lg font-bold text-pink-500 mt-2 italic">
                    Bonne chance mon tigre ! 🐯
                </p>
              
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="w-full bg-pink-500 hover:bg-pink-600 text-white text-lg font-black py-4 rounded-xl transition-all shadow-md shadow-pink-200 active:scale-95 border-2 border-pink-600"
          >
            🚀 Goooo
          </button>
        </div>
      )}

    </div>
  )
}