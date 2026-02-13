import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fonction asynchrone pour aller chercher les données
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*')

      if (error) {
        console.error('Erreur Supabase:', error)
        setError(error.message)
      } else {
        console.log('Données récupérées:', data)
        setQuestions(data)
      }
    }

    fetchQuestions()
  }, []) // Le tableau vide [] signifie : "Exécute ça une seule fois au chargement"

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quiz MVP - Test Connexion</h1>
      
      {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}
      
      {questions.length === 0 ? (
        <p>Chargement ou aucune question...</p>
      ) : (
        <ul>
          {questions.map((q) => (
            <li key={q.id}>
              <strong>{q.question_type}</strong>: {q.content_payload}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App