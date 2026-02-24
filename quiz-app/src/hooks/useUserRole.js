import { useState, useRef } from 'react'

export function useUserRole() {
  // On stocke le mot de passe s'il existe
  const [secretKey, setSecretKey] = useState(() => {
    return localStorage.getItem('pupuce')
  })

  const unlockSuperMode = (password) => {
    if (password) {
      localStorage.setItem('pupuce', password)
      setSecretKey(password)
      return true
    }
    return false
  }
  

  return { 
    isSuper: !!secretKey, // Vrai si on a une clé stockée
    secretKey,            // La clé elle-même
    unlockSuperMode 
  }
}