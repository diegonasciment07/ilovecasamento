import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// ── Tipos das tabelas ─────────────────────────────────────────
export interface RfMensagem {
  id: string
  nome: string
  mensagem: string
  created_at: string
}

export interface RfRsvp {
  id?: string
  nome: string
  presenca: 'sim' | 'nao'
  adultos: number
  criancas: number
  idades_criancas?: string
  email?: string
  telefone?: string
  mensagem?: string
  created_at?: string
}
