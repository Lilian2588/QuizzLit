import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// AJOUTE CES LOGS TEMPORAIRES
console.log("URL Supabase:", supabaseUrl)
console.log("Key Supabase:", supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)