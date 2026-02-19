import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export function useQuestions(config, reloadTrigger = 0) {
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false) 
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!config) return

    const fetchQuestions = async () => {
      setIsLoading(true)
      setError(null)
      try {
        let query = supabase.from('questions').select('*')

        // Filtres dynamiques
        if (config.themes && config.themes.length > 0) query = query.in('theme', config.themes)
        if (config.types && config.types.length > 0) query = query.in('question_type', config.types)
        
        // Filtre de difficulté pour la carte de progression
        if (config.difficulty) query = query.eq('difficulty', config.difficulty)

        const { data, error } = await query
        if (error) throw error

        let processedData = [...data]
        
        // On mélange aléatoirement
        processedData.sort(() => Math.random() - 0.5)

        // On coupe à 15 questions maximum par partie !
        processedData = processedData.slice(0, 15)

        setQuestions(processedData)
      } catch (err) {
        console.error('Erreur Supabase:', err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [config, reloadTrigger])

  return { questions, isLoading, error }
}