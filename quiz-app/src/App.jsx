import { useAppLogic } from './hooks/useAppLogic'
import NokeyScreen from './components/NokeyScreen'
import HomeScreen from './components/HomeScreen'
import ProgressionDashboard from './components/ProgressionDashboard'
import GameScreen from './components/GameScreen'
import EndScreen from './components/EndScreen'
import EndProgressionScreen from './components/EndProgressionScreen'

function App() {
  const {
    gameConfig, isLoading, error, questions, engine, 
    completedLevels, markLevelCompleted, showMap, showEndProgression, showNokeyScreen,
    handleHomeStart, handleLaunchFromMap, handleReturnToMenu, replaySession,
    hasNextLevel, handleNextLevel, handleShowProgression, goToEndProgressionScreen, onClose, handleOpen
  } = useAppLogic()

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden min-h-[600px] flex flex-col relative border border-gray-100">
      
        {/* 0. LA PAGE SECRÈTE */}
        {showNokeyScreen && (
          <NokeyScreen 
            onClose={onClose}
          />
        )}

        {/* 1. ACCUEIL */}
        {!showNokeyScreen && !gameConfig && !showMap && !showEndProgression &&(
          <HomeScreen 
            onStart={handleHomeStart} 
            GoMenu={handleReturnToMenu}
            handleShowProgression={handleShowProgression}
            handleOpen={handleOpen}
          />
        )}

        {/* 2. LA CARTE DE PROGRESSION */}
        {!gameConfig && showMap && !showEndProgression &&(
          <ProgressionDashboard 
            completedLevels={completedLevels} 
            onLaunchLevel={handleLaunchFromMap}
            GoMenu={handleReturnToMenu}
            handleShowProgression={handleShowProgression}
          />
        )}

        {/* 3. CHARGEMENT */}
        {gameConfig && isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center animate-pulse">
            <div className="text-4xl mb-4">⏳</div>
            <p className="font-bold text-gray-500">Préparation de la partie...</p>
          </div>
        )}

        {/* 4. ERREUR (Vide) */}
        {gameConfig && !isLoading && questions.length === 0 && !error && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <p className="text-xl font-bold text-red-500 mb-4">Mmh... Il n'y a pas encore 15 questions dans cette catégorie 😕</p>
            <button onClick={handleReturnToMenu} className="bg-gray-200 px-6 py-3 rounded-lg font-bold">Retour</button>
          </div>
        )}

        {/* 5. JEU */}
        {gameConfig && !isLoading && questions.length > 0 && engine.gameState === 'playing' && engine.currentQuestion && (
          <GameScreen 
            currentQuestion={engine.currentQuestion}
            currentIndex={engine.currentIndex}
            totalQuestions={questions.length}
            score={engine.score}
            feedback={engine.feedback}
            handleAnswer={engine.handleAnswer}
            nextQuestion={() => engine.nextQuestion(gameConfig)}
            GoMenu={handleReturnToMenu} 
            handleShowProgression={handleShowProgression}
            onSkipToEnd={engine.onSkipToEnd}
          />
        )}

        {/* 6. FIN */}
        {gameConfig && !isLoading && engine.gameState === 'finished' && (
          <EndScreen 
            score={engine.score} 
            total={questions.length} 
            levelId={gameConfig.levelId}
            markLevelCompleted={markLevelCompleted}
            hasNextLevel={hasNextLevel}   
            onNextLevel={handleNextLevel}       
            onReplay={replaySession} 
            handleShowProgression={handleShowProgression}
            GoMenu={handleReturnToMenu} 
            getMessage={engine.getMessage}
            getReaction={engine.getReaction}
            goToEndProgressionScreen={goToEndProgressionScreen}
          />
        )}

        {/* 7. ÉCRAN DE FIN DE PROGRESSION */}
        {showEndProgression && (
          <EndProgressionScreen 
            GoMenu={handleReturnToMenu}
            handleShowProgression={handleShowProgression}
          />
        )}

      </div>
    </div>
  )
}

export default App