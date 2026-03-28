'use client'

import { useState, useEffect } from 'react'
import { supabase, type RfMensagem } from '@/lib/supabase'

export default function MensagensPage() {
  const [messages, setMessages] = useState<RfMensagem[]>([])
  const [nome, setNome] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMessages() {
      const { data, error } = await supabase
        .from('rf_mensagens')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) setMessages(data)
      setLoading(false)
    }
    fetchMessages()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim() || !mensagem.trim()) return

    setSending(true)
    setError(null)

    const { data, error } = await supabase
      .from('rf_mensagens')
      .insert({ nome: nome.trim(), mensagem: mensagem.trim() })
      .select()
      .single()

    if (error) {
      setError('Erro ao enviar mensagem. Tente novamente.')
      setSending(false)
      return
    }

    if (data) setMessages([data, ...messages])
    setNome('')
    setMensagem('')
    setSubmitted(true)
    setSending(false)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="min-h-screen">
      <div className="page-header">
        <span className="eyebrow">Rafael &amp; Flávia</span>
        <h1 className="page-title mt-3">Mensagens aos noivos</h1>
        <div className="divider" />
        <p className="body-text-sm text-center mt-5 max-w-sm mx-auto">
          Deixe uma mensagem especial para o casal neste dia tão importante.
        </p>
      </div>

      {/* Formulário */}
      <section className="px-6 py-12 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="form-label">Seu nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Como você quer ser identificado?"
              required
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Mensagem</label>
            <textarea
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Escreva sua mensagem com carinho..."
              required
              rows={5}
              className="form-input resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? 'Enviando...' : 'Enviar mensagem'}
          </button>

          {submitted && (
            <p className="text-center font-serif text-lg italic" style={{ color: '#B87040' }}>
              Mensagem enviada com amor! ✦
            </p>
          )}

          {error && (
            <p className="text-center font-sans text-sm" style={{ color: '#B87040' }}>
              {error}
            </p>
          )}
        </form>
      </section>

      {/* Mensagens recebidas */}
      <section className="px-6 pb-16 max-w-lg mx-auto">
        <div className="w-full h-px mb-10" style={{ backgroundColor: '#D0C2B0' }} />

        {loading ? (
          <p className="text-center body-text-sm">Carregando mensagens...</p>
        ) : messages.length === 0 ? (
          <p className="text-center body-text-sm">
            Seja o primeiro a deixar uma mensagem para o casal!
          </p>
        ) : (
          <>
            <h2 className="font-serif italic text-2xl font-light text-center mb-8" style={{ color: '#1E1208' }}>
              Mensagens recebidas
            </h2>
            <div className="space-y-5">
              {messages.map((msg) => (
                <div key={msg.id} className="p-6" style={{ backgroundColor: '#F8F4EF', border: '1px solid #D0C2B0' }}>
                  <p className="font-serif italic font-light leading-relaxed mb-5" style={{ fontSize: '1.1rem', color: '#1E1208' }}>
                    &ldquo;{msg.mensagem}&rdquo;
                  </p>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #D0C2B0' }}>
                    <p className="font-sans font-bold text-sm" style={{ color: '#1E1208' }}>{msg.nome}</p>
                    <p className="body-text-sm">
                      {new Date(msg.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit', month: 'long', year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
