import { useState, useRef } from 'react'

export default function Header({ onHome, onProgression, showHomeButton, onSecretTrigger }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pressTimer = useRef(null)  

  const handleTimer = () => {
    if (!onSecretTrigger) return
    pressTimer.current = setTimeout(() => {
      onSecretTrigger()
    }, 0)
  }

  const CancelTimer= () => {
    if (pressTimer.current) clearTimeout(pressTimer.current)
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Bouton Hamburger */}
            <button
              onClick={toggleMenu}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              aria-label="Menu"
            >
              <div className="space-y-1">
                <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
            
            {/* Menu déroulant */}
            <div className={`absolute top-full left-4 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 transition-all duration-300 overflow-hidden
              ${isMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none border-0 shadow-none py-0'}`}>
              <button
                onClick={() => {
                  onHome()
                  closeMenu()
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                 Accueil
              </button>
              <button
                onClick={() => {
                  onProgression()
                  closeMenu()
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                 Progression
              </button>
            </div>

            {/* Nokey Page */}
            <div 
              onTouchStart={handleTimer}
              onTouchEnd={CancelTimer}
              onMouseDown={handleTimer}
              onMouseUp={CancelTimer}
              onMouseLeave={CancelTimer}
              className={`w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center transition-transform select-none touch-none ${onSecretTrigger ? 'cursor-pointer active:scale-90' : ''}`}
              style={{ WebkitTouchCallout: 'none' }}
            >
              <span className="text-white text-sm font-bold pointer-events-none">𝒬</span>
            </div>
            <div>
              <h1 className="text-lg font-black text-blue-900">𝒬𝓊𝒾𝔃𝔃𝓛𝒾𝓉</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">                      
            {showHomeButton && (
              <button
                onClick={onHome}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
              >
                <span className="text-sm font-medium">Quitter</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
