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

export const getSecureMediaUrl = async (filename, secretKey) => {
  const apiUrl = "/api/getUrl"
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: secretKey, filename: filename })
    })
    if (!res.ok) throw new Error(`Erreur API: status ${res.status}`)
    const data = await res.json()
    return data.signedUrl || null 
  } catch (err) {
    console.error(`Impossible de récupérer ${filename} :`, err.message)
    return null
  }
}

export function normalize(str) {
  return str
    .normalize("NFKD")
    .replace(/[\u2019\u2018\u2032\u00B4\u0060]/g, "'") // remplace les apostrophes variées
    .toLowerCase()
    .trim();
}


