'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import WheatOrnament from '@/components/WheatOrnament'

interface FormData {
  nome: string
  presenca: 'sim' | 'nao' | ''
  adultos: number
  criancas: number
  idades_criancas: string[]
  email: string
  telefone: string
  mensagem: string
}

interface RsvpPayload {
  nome: string
  presenca: 'sim' | 'nao'
  adultos: number
  criancas: number
  email: string | null
  telefone: string | null
  mensagem: string | null
  idades_criancas?: string | null
}

function isMissingChildAgesColumn(error: unknown) {
  if (!error || typeof error !== 'object') return false

  const details = error as { code?: string; message?: string }
  const message = details.message ?? ''

  return (
    details.code === 'PGRST204' &&
    message.toLowerCase().includes('idades_criancas')
  )
}

export default function ConfirmarPresencaPage() {
  const [form, setForm] = useState<FormData>({
    nome: '', presenca: '', adultos: 1, criancas: 0, idades_criancas: [], email: '', telefone: '', mensagem: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nome || !form.presenca) return

    setSending(true)
    setError(null)

    const idadesCriancas = form.idades_criancas
      .map((idade) => idade.trim())
      .filter(Boolean)
      .join(', ')

    const rsvp: RsvpPayload = {
      nome: form.nome.trim(),
      presenca: form.presenca,
      adultos: form.adultos,
      criancas: form.criancas,
      idades_criancas: idadesCriancas || null,
      email: form.email.trim() || null,
      telefone: form.telefone.trim() || null,
      mensagem: form.mensagem.trim() || null,
    }

    let { error } = await supabase.from('rf_rsvp').insert(rsvp)

    if (isMissingChildAgesColumn(error)) {
      const rsvpSemIdades = { ...rsvp }
      delete rsvpSemIdades.idades_criancas
      const retry = await supabase.from('rf_rsvp').insert(rsvpSemIdades)
      error = retry.error
    }

    if (error) {
      console.error('Erro ao registrar RSVP:', error)
      setError('Erro ao registrar sua resposta. Tente novamente.')
      setSending(false)
      return
    }

    setSending(false)
    setSubmitted(true)
  }

  if (submitted && form.presenca === 'sim') {
    return (
      <div className="min-h-screen flex flex-col">

        {/* Bloco principal — dark */}
        <div
          className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center"
          style={{ backgroundColor: '#120A02' }}
        >
          {/* Ícone check */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-8"
            style={{ border: '1.5px solid rgba(212,175,122,0.5)' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p className="eyebrow-light mb-5 block">17 de maio de 2026</p>

          <h1
            className="font-serif italic font-light text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 7vw, 3.25rem)', lineHeight: 1.1 }}
          >
            Parabéns,<br />
            <span style={{ color: '#D4AF7A' }}>{form.nome}!</span>
          </h1>

          <p className="font-serif italic font-light mb-10" style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            A sua presença foi confirmada.
          </p>

          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-10" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
            <WheatOrnament size="md" color="#D4AF7A" />
            <div className="h-px w-10" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
          </div>

          <p className="font-serif italic font-light" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.45)' }}>
            Mal podemos esperar para celebrar com você!
          </p>
        </div>

        {/* Bloco presente — cream */}
        <div
          className="flex flex-col items-center px-6 py-16 text-center"
          style={{ backgroundColor: '#EDE4D8', borderTop: '1px solid #D0C2B0' }}
        >
          <p className="eyebrow mb-4 block">Um gesto de carinho</p>
          <h2
            className="font-serif italic font-light mb-4"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 2.25rem)', color: '#1E1208', lineHeight: 1.15 }}
          >
            Aproveite para presentear<br />os noivos
          </h2>
          <div className="w-8 h-0.5 mx-auto mb-6" style={{ backgroundColor: '#B87040' }} />
          <p className="body-text-sm text-center mb-10 max-w-xs mx-auto">
            Cada presente é recebido com muito amor e gratidão.
          </p>
          <Link href="/lista-presentes" className="btn-primary">
            Ver lista de presentes
          </Link>

          <p className="font-serif italic mt-12" style={{ fontSize: '1.1rem', color: '#B87040' }}>
            Com amor, Rafael &amp; Flávia
          </p>
        </div>

      </div>
    )
  }

  if (submitted && form.presenca === 'nao') {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-8 h-0.5 mx-auto mb-10" style={{ backgroundColor: '#B87040' }} />
        <h2 className="font-serif italic font-light mb-5" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', color: '#1E1208' }}>
          Obrigado!
        </h2>
        <p className="body-text max-w-sm mx-auto">
          {form.nome}, lamentamos que não possa estar presente. Sua resposta foi registrada com carinho.
        </p>
        <p className="font-serif italic text-xl mt-10" style={{ color: '#B87040' }}>
          Com amor, Rafael &amp; Flávia
        </p>
        <div className="w-8 h-0.5 mx-auto mt-10" style={{ backgroundColor: '#D0C2B0' }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="page-header">
        <span className="eyebrow">Rafael &amp; Flávia</span>
        <h1 className="page-title mt-3">Confirmação de presença</h1>
        <div className="flex justify-center mt-5">
          <WheatOrnament size="md" color="#B87040" />
        </div>
        <p className="body-text-sm text-center mt-5 max-w-sm mx-auto">
          Confirme sua presença até <strong style={{ color: '#1E1208', fontWeight: 600 }}>15 de abril de 2026</strong>.
        </p>
      </div>

      <section className="px-6 py-12 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-7">

          <div>
            <label className="form-label">Nome completo *</label>
            <input
              type="text" required value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Seu nome completo"
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Você irá ao evento? *</label>
            <div className="flex gap-8 mt-2">
              {(['sim', 'nao'] as const).map((opcao) => (
                <button
                  key={opcao}
                  type="button"
                  onClick={() => setForm({ ...form, presenca: opcao })}
                  className="flex items-center gap-3 font-sans text-sm font-light transition-opacity"
                  style={{
                    color: form.presenca === opcao ? '#1E1208' : '#6B4F3A',
                    opacity: form.presenca && form.presenca !== opcao ? 0.5 : 1,
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all"
                    style={{
                      borderColor: form.presenca === opcao ? '#B87040' : '#D0C2B0',
                      backgroundColor: form.presenca === opcao ? '#B87040' : 'transparent',
                    }}
                  />
                  {opcao === 'sim' ? 'Sim, vou estar lá!' : 'Não poderei ir'}
                </button>
              ))}
            </div>
          </div>

          {form.presenca === 'sim' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Total de adultos', key: 'adultos' as const, options: [1,2,3,4,5] },
                  { label: 'Crianças (De 0 a 5 anos)', key: 'criancas' as const, options: [0,1,2,3,4] },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="form-label">{field.label}</label>
                    <select
                      value={form[field.key]}
                      onChange={(e) => {
                        const val = Number(e.target.value)
                        const update: Partial<FormData> = { [field.key]: val }
                        if (field.key === 'criancas') update.idades_criancas = Array(val).fill('')
                        setForm({ ...form, ...update })
                      }}
                      className="form-input"
                      style={{ backgroundColor: '#EDE4D8' }}
                    >
                      {field.options.map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              {form.criancas > 0 && (
                <div>
                  <label className="form-label">Idade das crianças</label>
                  <div className="grid grid-cols-2 gap-3 mt-1">
                    {Array.from({ length: form.criancas }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="font-sans text-xs font-light shrink-0" style={{ color: '#6B4F3A' }}>
                          Criança {i + 1}
                        </span>
                        <input
                          type="number" min={0} max={17}
                          value={form.idades_criancas[i] ?? ''}
                          onChange={(e) => {
                            const idades = [...form.idades_criancas]
                            idades[i] = e.target.value
                            setForm({ ...form, idades_criancas: idades })
                          }}
                          placeholder="anos"
                          className="form-input"
                          style={{ padding: '0.5rem 0.75rem' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div>
            <label className="form-label">E-mail</label>
            <input
              type="email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="seu@email.com"
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Telefone</label>
            <input
              type="tel" value={form.telefone}
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
              placeholder="(00) 00000-0000"
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Mensagem (opcional)</label>
            <textarea
              value={form.mensagem}
              onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
              placeholder="Deixe uma mensagem para o casal..."
              rows={4}
              className="form-input resize-none"
            />
          </div>

          {error && (
            <p className="font-sans text-sm text-center" style={{ color: '#B87040' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!form.nome || !form.presenca || sending}
            className="btn-primary w-full disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {sending ? 'Registrando...' : 'Responder'}
          </button>
        </form>
      </section>
    </div>
  )
}
