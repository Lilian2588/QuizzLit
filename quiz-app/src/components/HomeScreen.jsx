import { useConfigForm } from '../hooks/useConfigForm'
import Header from './Header'

export default function HomeScreen({ 
  onStart, 
  GoMenu, 
  handleShowProgression 
}) {

  const { mode, setMode, themes, toggleTheme, types, toggleType, submitConfig } = useConfigForm(onStart)

  // INVERSION : C'est maintenant Progression qui active le grisage
  const isProgression = mode === 'progression'

  return (
    <>
      <Header 
        onHome={GoMenu}
        onProgression={handleShowProgression}
        showHomeButton={false}
      />
      <div className="flex-1 flex flex-col p-6 animate-fade-in overflow-y-auto">
        <div className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-black text-blue-900 mb-2 tracking-tight">𝒬𝓊𝒾𝔃𝔃𝓛𝒾𝓉</h1>
          <p className="text-gray-500 font-medium">Paramétrez votre partie</p>
        </div>

        {/* --- CHOIX DU MODE --- */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Mode de Jeu</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setMode('progression')}
              className={`p-4 rounded-xl border-2 transition-all text-left ${isProgression ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}
            >
              <span className="block text-2xl mb-1">📈</span>
              <span className={`font-bold ${isProgression ? 'text-blue-700' : 'text-gray-700'}`}>Progression</span>
            </button>
            
            <button 
              onClick={() => setMode('freestyle')}
              className={`p-4 rounded-xl border-2 transition-all text-left ${mode === 'freestyle' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-gray-50'}`}
            >
              <span className="block text-2xl mb-1">🔀</span>
              <span className={`font-bold ${mode === 'freestyle' ? 'text-purple-700' : 'text-gray-700'}`}>Freestyle</span>
            </button>
          </div>
        </div>

        {/* --- CHOIX DES THÈMES --- */}
        <div className={`mb-6 transition-opacity duration-300 ${isProgression ? 'opacity-50 grayscale' : 'opacity-100'}`}>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            Univers {isProgression && <span className="text-xs font-normal text-blue-600 ml-2">(Indisponible en mode Progression)</span>}
          </h3>
          <div className="flex flex-wrap gap-2">
            {['LITERATURE', 'CINEMA'].map(theme => (
              <button
                key={theme}
                onClick={() => toggleTheme(theme)}
                disabled={isProgression}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${isProgression ? 'cursor-not-allowed' : 'cursor-pointer'} ${
                  themes.includes(theme) ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {theme === 'LITERATURE' ? '📚 Littérature' : '🎬 Cinéma'}
              </button>
            ))}
          </div>
        </div>

        {/* --- CHOIX DES TYPES --- */}
        <div className={`mb-8 transition-opacity duration-300 ${isProgression ? 'opacity-50 grayscale' : 'opacity-100'}`}>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Mécanique</h3>
          <div className="flex flex-wrap gap-2">
            {['QCM', 'INPUT'].map(type => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                disabled={isProgression}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${isProgression ? 'cursor-not-allowed' : 'cursor-pointer'} ${
                  types.includes(type) ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {type === 'QCM' ? '🔘 Multiples' : '⌨️ Saisie'}
              </button>
            ))}
          </div>
        </div>
        
        {/* BOUTON START */}
        <div className="mt-auto">
          <button 
            onClick={submitConfig}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl transition-all shadow-lg active:scale-95 text-lg"
          >
            Goooo 🚀
          </button>
        </div>
      </div>
    </>
  )
}