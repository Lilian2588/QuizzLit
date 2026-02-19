// On importe la structure partagée !
import { PROGRESSION_STRUCTURE } from '../hooks/useAppLogic' 
import Header from './Header'


export default function ProgressionDashboard({ completedLevels, onLaunchLevel, GoMenu, handleShowProgression }) {
  const renderBranch = (theme, title, emoji, colorClass) => {
    return (
      <div className="flex-1 flex flex-col-reverse gap-4 items-center">
        <h3 className="text-xl font-bold mb-4 mt-2">{emoji} {title}</h3>
        
        {/* On utilise PROGRESSION_STRUCTURE */}
        {PROGRESSION_STRUCTURE.map((step, index) => {
          const levelId = `${theme}_${step.diff}_${step.type}`
          const isCompleted = completedLevels[levelId]
          
          const prevLevelId = index > 0 ? `${theme}_${PROGRESSION_STRUCTURE[index - 1].diff}_${PROGRESSION_STRUCTURE[index - 1].type}` : null
          const isUnlocked = index === 0 || completedLevels[prevLevelId]
          
          const isCurrent = isUnlocked && !isCompleted

          return (
            <button
              key={levelId}
              disabled={!isUnlocked}
              onClick={() => onLaunchLevel({ 
                mode: 'progression', 
                themes: [theme], 
                types: [step.type], 
                difficulty: step.diff,
                levelId: levelId 
              })}
              className={`relative w-full max-w-[140px] p-3 rounded-xl border-2 font-bold text-sm transition-all flex flex-col items-center justify-center text-center
                ${isCompleted ? 'bg-green-100 border-green-500 text-green-700 shadow-sm' : 
                  isCurrent ? `${colorClass} shadow-md transform scale-105` : 
                  'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed opacity-70'}
              `}
            >
              {isCurrent && (
                <span className="absolute -top-6 text-3xl animate-bounce drop-shadow-md z-10">👩🏻</span>
              )}
              <span>{step.label}</span>
              <span className="text-xl mt-1">
                {isCompleted ? '✅' : isUnlocked ? '▶️' : '🔒'}
              </span>
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <>
        <Header onHome={GoMenu} onProgression={handleShowProgression} showHomeButton={false} />
        <div className="flex-1 flex flex-col p-4 animate-fade-in bg-gray-50 overflow-y-auto relative">
        <div className="text-center mt-2 mb-8">
            <h2 className="text-3xl font-black text-blue-900 tracking-tight">Progression</h2>
            <p className="text-gray-500 font-medium">Réussis un Sans Faute pour avancer Pépette !</p>
        </div>

        <div className="flex justify-between gap-4 mt-auto">
            {renderBranch('CINEMA', 'Cinéma', '🎬', 'bg-blue-100 border-blue-500 text-blue-800')}
            <div className="w-1 bg-gray-300 rounded-full my-10"></div>
            {renderBranch('LITERATURE', 'Lecture', '📚', 'bg-purple-100 border-purple-500 text-purple-800')}
        </div>
        </div>
    </>
  )
}