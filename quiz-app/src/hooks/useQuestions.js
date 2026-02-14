import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export function useQuestions() {
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase.from('questions').select('*')
        if (error) throw error
        
        // On mélange les questions dès la réception
        setQuestions(data.sort(() => Math.random() - 0.5))
      } catch (err) {
        console.error('Erreur Supabase:', err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  return { questions, isLoading, error }
}