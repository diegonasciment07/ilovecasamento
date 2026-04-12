'use client'

import { useState, useEffect } from 'react'
import { supabase, type RfMensagem } from '@/lib/supabase'
import WheatOrnament from '@/components/WheatOrnament'

export default function MensagensPage() {
  const [messages, setMessages] = useState<RfMensagem[]>([])
  const [nome, setNome] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)

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
    if (error) { setError('Erro ao enviar mensagem. Tente novamente.'); setSending(false); return }
    if (data) setMessages([data, ...messages])
    setNome('')
    setMensagem('')
    setSubmitted(true)
    setSending(false)
    setFormOpen(false)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen">

      {/* ── Header ── */}
      <div className="page-header">
        <span className="eyebrow">Rafael &amp; Flávia</span>
        <h1 className="page-title mt-3">Mensagens aos noivos</h1>
        <div className="flex justify-center mt-5">
          <WheatOrnament size="md" color="#B87040" />
        </div>
        <p className="body-text-sm text-center mt-5 max-w-sm mx-auto">
          Deixe uma mensagem especial para o casal neste dia tão importante.
        </p>
      </div>

      {/* ── CTA escrever ── */}
      <div className="flex justify-center px-6 py-10">
        {submitted ? (
          <div className="flex items-center gap-3 px-6 py-4" style={{ backgroundColor: '#EDE4D8', border: '1px solid #D0C2B0' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B87040" strokeWidth="1.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <p className="font-serif italic font-light" style={{ fontSize: '1rem', color: '#1E1208' }}>
              Mensagem enviada com amor!
            </p>
          </div>
        ) : !formOpen ? (
          <button
            onClick={() => setFormOpen(true)}
            className="btn-primary flex items-center gap-3"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            Deixar uma mensagem
          </button>
        ) : null}
      </div>

      {/* ── Formulário inline ── */}
      {formOpen && (
        <div className="px-6 pb-10 max-w-lg mx-auto">
          <div className="p-6" style={{ backgroundColor: '#EDE4D8', border: '1px solid #D0C2B0' }}>
            <p className="font-sans font-bold uppercase mb-6" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#B87040' }}>
              Sua mensagem
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label">Seu nome</label>
                <input
                  type="text" value={nome}
                  onChange={e => setNome(e.target.value)}
                  placeholder="Como você quer ser identificado?"
                  required className="form-input"
                  style={{ backgroundColor: '#FAF7F2' }}
                />
              </div>
              <div>
                <label className="form-label">Mensagem</label>
                <textarea
                  value={mensagem}
                  onChange={e => setMensagem(e.target.value)}
                  placeholder="Escreva sua mensagem com carinho..."
                  required rows={4}
                  className="form-input resize-none"
                  style={{ backgroundColor: '#FAF7F2' }}
                />
              </div>
              {error && <p className="text-center font-sans text-sm" style={{ color: '#B87040' }}>{error}</p>}
              <div className="flex gap-3">
                <button type="submit" disabled={sending}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
                  {sending ? 'Enviando...' : 'Enviar'}
                </button>
                <button type="button" onClick={() => setFormOpen(false)}
                  className="btn-outline px-5">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Mural de mensagens ── */}
      <section className="px-6 md:px-10 pb-16 max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center body-text-sm py-16">Carregando mensagens...</p>
        ) : messages.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif italic font-light mb-2" style={{ fontSize: '1.25rem', color: '#6B4F3A' }}>
              Nenhuma mensagem ainda.
            </p>
            <p className="body-text-sm">Seja o primeiro a deixar uma mensagem para o casal!</p>
          </div>
        ) : (
          <>
            {/* contador */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1" style={{ backgroundColor: '#D0C2B0' }} />
              <p className="font-sans font-bold uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#B87040' }}>
                {messages.length} {messages.length === 1 ? 'mensagem' : 'mensagens'}
              </p>
              <div className="h-px flex-1" style={{ backgroundColor: '#D0C2B0' }} />
            </div>

            {/* grid masonry via CSS columns */}
            <div style={{ columns: '1', gap: '1rem' }} className="sm:[column-count:2] lg:[column-count:3]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="mb-4 overflow-hidden"
                  style={{
                    breakInside: 'avoid',
                    backgroundColor: '#FAF7F2',
                    border: '1px solid #D0C2B0',
                  }}
                >
                  {/* topo decorativo */}
                  <div className="h-1" style={{ backgroundColor: '#B87040', opacity: 0.35 }} />

                  <div className="p-5">
                    {/* aspas */}
                    <svg width="22" height="16" viewBox="0 0 32 24" fill="#D4AF7A" opacity={0.4} className="mb-3">
                      <path d="M0 24V14C0 6.268 4.148 1.555 12.444 0L14 3.111C10.37 4 8.148 6.148 7.333 9.556H13.333V24H0ZM18.667 24V14C18.667 6.268 22.815 1.555 31.111 0L32.667 3.111C29.037 4 26.815 6.148 26 9.556H32V24H18.667Z"/>
                    </svg>

                    {/* texto */}
                    <p className="font-serif italic font-light mb-4" style={{ fontSize: '0.975rem', color: '#1E1208', lineHeight: 1.8 }}>
                      {msg.mensagem}
                    </p>

                    {/* rodapé */}
                    <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #EDE4D8' }}>
                      <p className="font-sans font-bold text-sm" style={{ color: '#1E1208' }}>{msg.nome}</p>
                      <p className="font-sans font-light" style={{ fontSize: '0.65rem', color: '#9A7E6A' }}>
                        {new Date(msg.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                      </p>
                    </div>
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
