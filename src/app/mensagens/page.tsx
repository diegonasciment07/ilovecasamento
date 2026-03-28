'use client'

import { useState, useEffect } from 'react'

interface Message {
  id: string
  name: string
  message: string
  date: string
}

export default function MensagensPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('rf_messages')
    if (stored) setMessages(JSON.parse(stored))
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
    }

    const updated = [newMessage, ...messages]
    setMessages(updated)
    localStorage.setItem('rf_messages', JSON.stringify(updated))
    setName('')
    setMessage('')
    setSubmitted(true)
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Como você quer ser identificado?"
              required
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Mensagem</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escreva sua mensagem com carinho..."
              required
              rows={5}
              className="form-input resize-none"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Enviar mensagem
          </button>

          {submitted && (
            <p className="text-center font-serif text-lg italic" style={{ color: '#B87040' }}>
              Mensagem enviada com amor! ✦
            </p>
          )}
        </form>
      </section>

      {/* Mensagens recebidas */}
      {messages.length > 0 && (
        <section className="px-6 pb-16 max-w-lg mx-auto">
          <div className="w-full h-px mb-10" style={{ backgroundColor: '#D0C2B0' }} />

          <h2 className="font-serif italic text-2xl font-light text-center mb-8" style={{ color: '#1E1208' }}>
            Mensagens recebidas
          </h2>

          <div className="space-y-5">
            {messages.map((msg) => (
              <div key={msg.id} className="p-6" style={{ backgroundColor: '#F8F4EF', border: '1px solid #D0C2B0' }}>
                <p className="font-serif italic font-light leading-relaxed mb-5" style={{ fontSize: '1.1rem', color: '#1E1208' }}>
                  &ldquo;{msg.message}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #D0C2B0' }}>
                  <p className="font-sans font-bold text-sm" style={{ color: '#1E1208' }}>{msg.name}</p>
                  <p className="body-text-sm">{msg.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
