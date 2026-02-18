export default function Footer({ onSkipToEnd }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-md mx-auto px-4 py-3">
        <button
          onClick={onSkipToEnd}
          className="w-full bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 text-red-700 font-bold py-3 rounded-lg hover:from-red-100 hover:to-orange-100 transition-all transform hover:scale-105"
        >
          ⏭️ Aller à la fin
        </button>
      </div>
    </div>
  )
}