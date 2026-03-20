import { useState } from 'react'
import { useUserRole } from '../hooks/useUserRole' 

export function useConfigForm(onStartCallback) {

  const { isSuper } = useUserRole()

  const [mode, setMode] = useState('freestyle')
  const [themes, setThemes] = useState(['LITERATURE', 'CINEMA'])
  const [types, setTypes] = useState(['QCM', 'INPUT'])

  const handleSetMode = (newMode) => {
    setMode(newMode)
    // INVERSION : C'est maintenant en mode PROGRESSION qu'on force la sélection de TOUT
    if (newMode === 'progression') {
      setThemes(['LITERATURE', 'CINEMA'])
      setTypes(['QCM', 'INPUT'])
    }
  }

  // 2. Gestion des filtres (Bloquée si progression)
  const toggleTheme = (theme) => {
    if (mode === 'progression') return 
    
    if (themes.includes(theme)) {
      if (themes.length > 1) setThemes(themes.filter(t => t !== theme))
    } else {
      setThemes([...themes, theme])
    }
  }

  const toggleType = (type) => {
    if (mode === 'progression') return 

    if (types.includes(type)) {
      if (types.length > 1) setTypes(types.filter(t => t !== type))
    } else {
      setTypes([...types, type])
    }
  }

  const submitConfig = () => {
    let finalThemes = [...themes]; 
    if (isSuper && mode === 'freestyle') {
      finalThemes.push('PERSO');
    }
    onStartCallback({ mode, themes: finalThemes, types });
  }

  return {
    mode, setMode: handleSetMode, 
    themes, toggleTheme,
    types, toggleType,
    submitConfig
  }
}