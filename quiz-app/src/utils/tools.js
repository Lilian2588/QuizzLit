export function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function playAudio(audioPath) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioPath)
    audio.onended = () => resolve()
    audio.onerror = (err) => reject(err)
    audio.play().catch(reject)
  })
}
