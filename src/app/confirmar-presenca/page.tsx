'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import WheatOrnament from '@/components/WheatOrnament'

interface FormData {
  nome: string
  presenca: 'sim' | 'nao' | ''
  adultos: number
  criancas: number
  email: string
  telefone: string
  mensagem: string
}

export default function ConfirmarPresencaPage() {
  const [form, setForm] = useState<FormData>({
    nome: '', presenca: '', adultos: 1, criancas: 0, email: '', telefone: '', mensagem: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nome || !form.presenca) return

    setSending(true)
    setError(null)

    const { error } = await supabase.from('rf_rsvp').insert({
      nome:      form.nome,
      presenca:  form.presenca,
      adultos:   form.adultos,
      criancas:  form.criancas,
      email:     form.email   || null,
      telefone:  form.telefone || null,
      mensagem:  form.mensagem || null,
    })

    if (error) {
      setError('Erro ao registrar sua resposta. Tente novamente.')
      setSending(false)
      return
    }

    setSending(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-8 h-0.5 mx-auto mb-10" style={{ backgroundColor: '#B87040' }} />
        <h2 className="font-serif italic font-light mb-5" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', color: '#1E1208' }}>
          {form.presenca === 'sim' ? 'Até breve!' : 'Obrigado!'}
        </h2>
        <p className="body-text max-w-sm mx-auto">
          {form.presenca === 'sim'
            ? `${form.nome}, sua presença foi confirmada. Mal podemos esperar para celebrar com você!`
            : `${form.nome}, lamentamos que não possa estar presente. Sua resposta foi registrada com carinho.`}
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
          Confirme sua presença até <strong style={{ color: '#1E1208', fontWeight: 600 }}>10 de maio de 2026</strong>.
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
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Total de adultos', key: 'adultos' as const, options: [1,2,3,4,5] },
                { label: 'Crianças',         key: 'criancas' as const, options: [0,1,2,3,4] },
              ].map((field) => (
                <div key={field.key}>
                  <label className="form-label">{field.label}</label>
                  <select
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: Number(e.target.value) })}
                    className="form-input"
                    style={{ backgroundColor: '#EDE4D8' }}
                  >
                    {field.options.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              ))}
            </div>
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
