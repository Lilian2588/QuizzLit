// api/getUrl.js
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  // On récupère le mot de passe envoyé par le site
  const { password, filename } = req.body

  // On vérifie si c'est le bon mot de passe (Défini dans Vercel)
  if (password !== process.env.APP_ACCESS_KEY) {
    return res.status(401).json({ error: 'Mot de passe incorrect' })
  }

  // CLÉ SERVICE (Admin)
  // Clé coté serveur
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  // URL temporaire de Supabase 
  const { data, error } = await supabase
    .storage
    .from('PrivateMedias') // Bucket privé
    .createSignedUrl(filename, 60) 

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  // On retourne l'URL signée au client
  return res.status(200).json({ signedUrl: data.signedUrl })
}