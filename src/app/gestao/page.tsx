'use client'
import { useState, useEffect } from 'react'
import { supabase, type RfRsvp, type RfMensagem } from '@/lib/supabase'

const SENHA = 'rf2026'

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatDate(s: string) {
  return new Date(s).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

const VALORES: Record<string, number> = {
  'Sal Grosso': 50,
  'Vale Dancinha Esquisita': 50,
  'Café pra Noiva': 80,
  'Vale Corte de Cabelo': 80,
  'Avental do Chef': 120,
  'Tábua de Carne': 150,
  'Máscara de Gás': 150,
  'Estoque de Chocolate': 200,
  'Vaquinha do Casamento': 200,
  'Massagem para o Noivo': 250,
  'Cofrinho da TPM': 300,
  'Kit Controles Remotos': 300,
  'Sabres de Luz': 350,
  'Bolo de Chocolate Semanal': 400,
  'Kit Cinema em Casa': 400,
  'Airfryer': 500,
  'Cota para a Viagem': 500,
  'Vale SPA': 600,
  'Um Mês de Almoço': 800,
  'Academia do Casal': 1200,
  'Máquina de Lavar': 1500,
  'Upgrade na Carreira': 1500,
  'TV para The Chosen': 1800,
  'Geladeira': 2200,
  'Sofá da Célula': 2500,
  'Cama King': 3500,
  'PS5': 4500,
  'Um Fusca': 5000,
  'Lua de Mel em Bariloche': 8000,
  'Um Carro': 8000,
  '1 Ano de Aluguel': 9000,
  'Uma Casa': 10000,
}

type Tab = 'presencas' | 'mensagens' | 'presentes'

export default function GestaoPage() {
  const [autenticado, setAutenticado] = useState(false)
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(false)
  const [tab, setTab] = useState<Tab>('presencas')
  const [rsvps, setRsvps] = useState<RfRsvp[]>([])
  const [mensagens, setMensagens] = useState<RfMensagem[]>([])
  const [presentesNomes, setPresentesNomes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (senha === SENHA) {
      setAutenticado(true)
      setErro(false)
    } else {
      setErro(true)
    }
  }

  useEffect(() => {
    if (!autenticado) return
    setLoading(true)
    async function fetchAll() {
      const [rsvpRes, msgRes, presRes] = await Promise.all([
        supabase.from('rf_rsvp').select('*').order('created_at', { ascending: false }),
        supabase.from('rf_mensagens').select('*').order('created_at', { ascending: false }),
        supabase.from('rf_presentes').select('presente_nome').order('created_at', { ascending: false }),
      ])
      if (rsvpRes.data) setRsvps(rsvpRes.data as RfRsvp[])
      if (msgRes.data) setMensagens(msgRes.data as RfMensagem[])
      if (presRes.data) setPresentesNomes(presRes.data.map((p: { presente_nome: string }) => p.presente_nome))
      setLoading(false)
    }
    fetchAll()
  }, [autenticado])

  const confirmados = rsvps.filter(r => r.presenca === 'sim')
  const naoVirao   = rsvps.filter(r => r.presenca === 'nao')
  const totalAdultos  = confirmados.reduce((s, r) => s + (r.adultos  || 0), 0)
  const totalCriancas = confirmados.reduce((s, r) => s + (r.criancas || 0), 0)

  const presentesSummary = Object.entries(
    presentesNomes.reduce((acc, nome) => {
      acc[nome] = (acc[nome] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  )
    .map(([nome, cotas]) => ({ nome, cotas, valor: VALORES[nome] || 0, total: cotas * (VALORES[nome] || 0) }))
    .sort((a, b) => b.total - a.total)

  const totalArrecadado = presentesSummary.reduce((s, p) => s + p.total, 0)

  // ── Login ──────────────────────────────────────────────────────────────────
  if (!autenticado) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#120A02' }}>
        <div className="w-full max-w-xs">
          <p className="font-serif italic font-light text-center mb-2" style={{ fontSize: '1.5rem', color: '#D4AF7A' }}>
            Rafael &amp; Flávia
          </p>
          <p className="font-sans font-bold uppercase text-center mb-8"
            style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.35)' }}>
            Área de Gestão
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={senha}
              onChange={e => { setSenha(e.target.value); setErro(false) }}
              placeholder="Senha"
              className="w-full px-4 py-3 font-sans font-light text-sm outline-none"
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: `1.5px solid ${erro ? '#B87040' : 'rgba(255,255,255,0.15)'}`,
                color: 'white',
              }}
              autoFocus
            />
            {erro && (
              <p className="font-sans text-xs text-center" style={{ color: '#B87040' }}>Senha incorreta</p>
            )}
            <button type="submit" className="w-full py-3 font-sans font-bold uppercase transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#B87040', color: 'white', fontSize: '0.65rem', letterSpacing: '0.25em' }}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────
  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'presencas', label: 'Presenças', count: rsvps.length },
    { id: 'mensagens', label: 'Mensagens', count: mensagens.length },
    { id: 'presentes', label: 'Presentes', count: presentesNomes.length },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F4EF' }}>

      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between"
        style={{ backgroundColor: '#120A02', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div>
          <p className="font-serif italic font-light" style={{ fontSize: '1.1rem', color: '#D4AF7A' }}>
            Rafael &amp; Flávia
          </p>
          <p className="font-sans font-bold uppercase mt-0.5"
            style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.35)' }}>
            Gestão · 17.05.2026
          </p>
        </div>
        <button onClick={() => setAutenticado(false)}
          className="font-sans font-bold uppercase transition-opacity hover:opacity-60"
          style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)' }}>
          Sair
        </button>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-6 py-6 max-w-5xl mx-auto">
        {[
          { label: 'Confirmados',    value: confirmados.length, sub: `${totalAdultos} adultos · ${totalCriancas} crianças` },
          { label: 'Não vão',        value: naoVirao.length,    sub: 'responderam que não' },
          { label: 'Mensagens',      value: mensagens.length,   sub: 'enviadas ao casal' },
          { label: 'Arrecadado',     value: formatBRL(totalArrecadado), sub: `${presentesNomes.length} cotas confirmadas` },
        ].map(c => (
          <div key={c.label} className="p-4" style={{ backgroundColor: '#EDE4D8', border: '1px solid #D0C2B0' }}>
            <p className="font-sans font-bold uppercase mb-1"
              style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B87040' }}>
              {c.label}
            </p>
            <p className="font-serif italic font-light" style={{ fontSize: '1.6rem', color: '#1E1208', lineHeight: 1 }}>
              {c.value}
            </p>
            <p className="font-sans font-light mt-1" style={{ fontSize: '0.65rem', color: '#6B4F3A' }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-6 max-w-5xl mx-auto">
        <div className="flex gap-0" style={{ borderBottom: '2px solid #D0C2B0' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-5 py-3 font-sans font-bold uppercase transition-colors"
              style={{
                fontSize: '0.6rem', letterSpacing: '0.2em',
                color: tab === t.id ? '#B87040' : '#6B4F3A',
                borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                borderBottom: tab === t.id ? '2px solid #B87040' : '2px solid transparent',
                marginBottom: '-2px',
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}>
              {t.label} <span style={{ opacity: 0.6 }}>({t.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-6 py-8 max-w-5xl mx-auto">
        {loading ? (
          <p className="text-center font-sans font-light text-sm" style={{ color: '#6B4F3A' }}>Carregando...</p>
        ) : (

          // ── PRESENÇAS ────────────────────────────────────────────────────
          tab === 'presencas' ? (
            <div className="overflow-x-auto">
              {rsvps.length === 0 ? (
                <p className="font-sans font-light text-sm text-center py-10" style={{ color: '#6B4F3A' }}>
                  Nenhuma resposta ainda.
                </p>
              ) : (
                <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #B87040' }}>
                      {['Nome', 'Presença', 'Adultos', 'Crianças', 'Email', 'Telefone', 'Mensagem', 'Data'].map(h => (
                        <th key={h} className="pb-3 pr-4 font-sans font-bold uppercase"
                          style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#B87040', whiteSpace: 'nowrap' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rsvps.map((r, i) => (
                      <tr key={r.id ?? i} style={{ borderBottom: '1px solid #D0C2B0' }}>
                        <td className="py-3 pr-4 font-sans text-sm font-light" style={{ color: '#1E1208', whiteSpace: 'nowrap' }}>{r.nome}</td>
                        <td className="py-3 pr-4">
                          <span className="font-sans font-bold uppercase"
                            style={{
                              fontSize: '0.55rem', letterSpacing: '0.15em',
                              color: r.presenca === 'sim' ? '#2E7D32' : '#B87040',
                            }}>
                            {r.presenca === 'sim' ? '✓ Sim' : '✗ Não'}
                          </span>
                        </td>
                        <td className="py-3 pr-4 font-sans text-sm font-light text-center" style={{ color: '#4A3422' }}>{r.adultos ?? '—'}</td>
                        <td className="py-3 pr-4 font-sans text-sm font-light text-center" style={{ color: '#4A3422' }}>{r.criancas ?? '—'}</td>
                        <td className="py-3 pr-4 font-sans text-sm font-light" style={{ color: '#4A3422' }}>{r.email || '—'}</td>
                        <td className="py-3 pr-4 font-sans text-sm font-light" style={{ color: '#4A3422', whiteSpace: 'nowrap' }}>{r.telefone || '—'}</td>
                        <td className="py-3 pr-4 font-sans text-sm font-light" style={{ color: '#4A3422', maxWidth: 220 }}>{r.mensagem || '—'}</td>
                        <td className="py-3 font-sans text-xs font-light" style={{ color: '#9A7E6A', whiteSpace: 'nowrap' }}>{r.created_at ? formatDate(r.created_at) : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

          // ── MENSAGENS ────────────────────────────────────────────────────
          ) : tab === 'mensagens' ? (
            <div className="space-y-4">
              {mensagens.length === 0 ? (
                <p className="font-sans font-light text-sm text-center py-10" style={{ color: '#6B4F3A' }}>
                  Nenhuma mensagem ainda.
                </p>
              ) : mensagens.map(m => (
                <div key={m.id} className="p-5" style={{ backgroundColor: '#EDE4D8', border: '1px solid #D0C2B0' }}>
                  <p className="font-serif italic font-light mb-3" style={{ fontSize: '1rem', color: '#1E1208', lineHeight: 1.7 }}>
                    &ldquo;{m.mensagem}&rdquo;
                  </p>
                  <div className="flex items-center justify-between" style={{ borderTop: '1px solid #D0C2B0', paddingTop: '0.75rem' }}>
                    <p className="font-sans font-bold text-sm" style={{ color: '#1E1208' }}>{m.nome}</p>
                    <p className="font-sans text-xs font-light" style={{ color: '#9A7E6A' }}>{formatDate(m.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>

          // ── PRESENTES ────────────────────────────────────────────────────
          ) : (
            <div>
              {presentesSummary.length === 0 ? (
                <p className="font-sans font-light text-sm text-center py-10" style={{ color: '#6B4F3A' }}>
                  Nenhum presente confirmado ainda.
                </p>
              ) : (
                <>
                  <table className="w-full text-left mb-6" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #B87040' }}>
                        {['Presente', 'Cotas', 'Valor unit.', 'Total'].map(h => (
                          <th key={h} className="pb-3 pr-4 font-sans font-bold uppercase"
                            style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#B87040' }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {presentesSummary.map(p => (
                        <tr key={p.nome} style={{ borderBottom: '1px solid #D0C2B0' }}>
                          <td className="py-3 pr-4 font-sans text-sm font-light" style={{ color: '#1E1208' }}>{p.nome}</td>
                          <td className="py-3 pr-4 font-sans text-sm font-light text-center" style={{ color: '#4A3422' }}>
                            {p.cotas}/10
                          </td>
                          <td className="py-3 pr-4 font-sans text-sm font-light" style={{ color: '#4A3422' }}>{formatBRL(p.valor)}</td>
                          <td className="py-3 font-sans text-sm font-bold" style={{ color: '#1E1208' }}>{formatBRL(p.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr style={{ borderTop: '2px solid #B87040' }}>
                        <td colSpan={3} className="pt-4 font-sans font-bold uppercase"
                          style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#B87040' }}>
                          Total arrecadado
                        </td>
                        <td className="pt-4 font-serif italic font-light" style={{ fontSize: '1.25rem', color: '#1E1208' }}>
                          {formatBRL(totalArrecadado)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </>
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}
