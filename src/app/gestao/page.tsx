'use client'
import { useState, useEffect } from 'react'
import { supabase, type RfRsvp, type RfMensagem } from '@/lib/supabase'

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
  'Sal Grosso': 50, 'Vale Dancinha Esquisita': 50,
  'Café pra Noiva': 80, 'Vale Corte de Cabelo': 80,
  'Avental do Chef': 120, 'Tábua de Carne': 150, 'Máscara de Gás': 150,
  'Estoque de Chocolate': 200, 'Vaquinha do Casamento': 200,
  'Massagem para o Noivo': 250, 'Cofrinho da TPM': 300, 'Kit Controles Remotos': 300,
  'Sabres de Luz': 350, 'Bolo de Chocolate Semanal': 400, 'Kit Cinema em Casa': 400,
  'Airfryer': 500, 'Cota para a Viagem': 500, 'Vale SPA': 600,
  'Um Mês de Almoço': 800, 'Academia do Casal': 1200,
  'Máquina de Lavar': 1500, 'Upgrade na Carreira': 1500, 'TV para The Chosen': 1800,
  'Geladeira': 2200, 'Sofá da Célula': 2500, 'Cama King': 3500,
  'PS5': 4500, 'Um Fusca': 5000,
  'Lua de Mel em Bariloche': 8000, 'Um Carro': 8000,
  '1 Ano de Aluguel': 9000, 'Uma Casa': 10000,
}

type Tab = 'presencas' | 'mensagens' | 'presentes'

// ── Modal genérico ────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 z-40" style={{ backgroundColor: 'rgba(18,10,2,0.55)' }} onClick={onClose} />
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto rounded-sm overflow-hidden"
        style={{ backgroundColor: '#FAF7F2', border: '1px solid #D0C2B0', boxShadow: '0 16px 48px rgba(18,10,2,0.25)' }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #D0C2B0' }}>
          <p className="font-sans font-bold uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: '#B87040' }}>
            {title}
          </p>
          <button onClick={onClose} style={{ color: '#9A7E6A', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}>×</button>
        </div>
        <div className="px-5 py-5 overflow-y-auto" style={{ maxHeight: '70vh' }}>
          {children}
        </div>
      </div>
    </>
  )
}

// ── Linha de detalhe no modal ────────────────────────────────────────────────
function Detalhe({ label, value }: { label: string; value?: string | number | null }) {
  if (!value && value !== 0) return null
  return (
    <div className="flex gap-3 py-2.5" style={{ borderBottom: '1px solid #EDE4D8' }}>
      <span className="font-sans font-bold uppercase shrink-0 w-28" style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: '#B87040', paddingTop: 2 }}>
        {label}
      </span>
      <span className="font-sans font-light text-sm" style={{ color: '#1E1208', lineHeight: 1.6 }}>{value}</span>
    </div>
  )
}

export default function GestaoPage() {
  const [autenticado, setAutenticado] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [loginLoading, setLoginLoading] = useState(false)
  const [tab, setTab] = useState<Tab>('presencas')
  const [rsvps, setRsvps] = useState<RfRsvp[]>([])
  const [mensagens, setMensagens] = useState<RfMensagem[]>([])
  const [presentesNomes, setPresentesNomes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [modalRsvp, setModalRsvp] = useState<RfRsvp | null>(null)
  const [modalMsg, setModalMsg] = useState<RfMensagem | null>(null)
  const [filtroPresenca, setFiltroPresenca] = useState<'todos' | 'sim' | 'nao'>('todos')

  // Restaura sessão existente ao montar
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setAutenticado(true)
    })
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginLoading(true)
    setErro(null)
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: senha })
    if (error) {
      setErro('Email ou senha incorretos')
      setLoginLoading(false)
      return
    }
    setAutenticado(true)
    setLoginLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setAutenticado(false)
  }

  useEffect(() => {
    if (!autenticado) return
    setLoading(true)
    Promise.all([
      supabase.from('rf_rsvp').select('*').order('created_at', { ascending: false }),
      supabase.from('rf_mensagens').select('*').order('created_at', { ascending: false }),
      supabase.from('rf_presentes').select('presente_nome').order('created_at', { ascending: false }),
    ]).then(([r, m, p]) => {
      if (r.data) setRsvps(r.data as RfRsvp[])
      if (m.data) setMensagens(m.data as RfMensagem[])
      if (p.data) setPresentesNomes(p.data.map((x: { presente_nome: string }) => x.presente_nome))
      setLoading(false)
    })
  }, [autenticado])

  const confirmados   = rsvps.filter(r => r.presenca === 'sim')
  const naoVirao      = rsvps.filter(r => r.presenca === 'nao')
  const totalAdultos  = confirmados.reduce((s, r) => s + (r.adultos  || 0), 0)
  const totalCriancas = confirmados.reduce((s, r) => s + (r.criancas || 0), 0)

  const rsvpsFiltrados = filtroPresenca === 'todos' ? rsvps
    : rsvps.filter(r => r.presenca === filtroPresenca)
  const totalAdultosFiltro  = rsvpsFiltrados.reduce((s, r) => s + (r.adultos  || 0), 0)
  const totalCriancasFiltro = rsvpsFiltrados.reduce((s, r) => s + (r.criancas || 0), 0)

  const presentesSummary = Object.entries(
    presentesNomes.reduce((acc, n) => { acc[n] = (acc[n] || 0) + 1; return acc }, {} as Record<string, number>)
  ).map(([nome, cotas]) => ({ nome, cotas, valor: VALORES[nome] || 0, total: cotas * (VALORES[nome] || 0) }))
   .sort((a, b) => b.total - a.total)
  const totalArrecadado = presentesSummary.reduce((s, p) => s + p.total, 0)

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'presencas', label: 'Presenças', count: rsvps.length },
    { id: 'mensagens', label: 'Mensagens', count: mensagens.length },
    { id: 'presentes', label: 'Presentes', count: presentesNomes.length },
  ]

  // ── Login ──────────────────────────────────────────────────────────────────
  if (!autenticado) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#120A02' }}>
        <div className="w-full max-w-xs">
          <p className="font-serif italic font-light text-center mb-2" style={{ fontSize: '1.5rem', color: '#D4AF7A' }}>Rafael &amp; Flávia</p>
          <p className="font-sans font-bold uppercase text-center mb-8" style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.35)' }}>Área de Gestão</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email" value={email}
              onChange={e => { setEmail(e.target.value); setErro(null) }}
              placeholder="Email" autoFocus required
              className="w-full px-4 py-3 font-sans font-light text-sm outline-none"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: `1.5px solid ${erro ? '#B87040' : 'rgba(255,255,255,0.15)'}`, color: 'white' }}
            />
            <input
              type="password" value={senha}
              onChange={e => { setSenha(e.target.value); setErro(null) }}
              placeholder="Senha" required
              className="w-full px-4 py-3 font-sans font-light text-sm outline-none"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: `1.5px solid ${erro ? '#B87040' : 'rgba(255,255,255,0.15)'}`, color: 'white' }}
            />
            {erro && <p className="font-sans text-xs text-center" style={{ color: '#B87040' }}>{erro}</p>}
            <button type="submit" disabled={loginLoading}
              className="w-full py-3 font-sans font-bold uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: '#B87040', color: 'white', fontSize: '0.65rem', letterSpacing: '0.25em' }}>
              {loginLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F4EF' }}>

      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between"
        style={{ backgroundColor: '#120A02', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div>
          <p className="font-serif italic font-light" style={{ fontSize: '1.1rem', color: '#D4AF7A' }}>Rafael &amp; Flávia</p>
          <p className="font-sans font-bold uppercase mt-0.5" style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.35)' }}>Gestão · 17.05.2026</p>
        </div>
        <button onClick={handleLogout} className="font-sans font-bold uppercase transition-opacity hover:opacity-60"
          style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}>
          Sair
        </button>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 px-6 py-6 max-w-5xl mx-auto">
        {[
          { label: 'Confirmados', value: confirmados.length,       sub: 'irão ao casamento' },
          { label: 'Adultos',     value: totalAdultos,              sub: 'pessoas confirmadas' },
          { label: 'Crianças',    value: totalCriancas,             sub: 'crianças confirmadas' },
          { label: 'Mensagens',   value: mensagens.length,          sub: 'enviadas ao casal' },
          { label: 'Arrecadado',  value: formatBRL(totalArrecadado), sub: `${presentesNomes.length} cotas` },
        ].map(c => (
          <div key={c.label} className="p-4" style={{ backgroundColor: '#EDE4D8', border: '1px solid #D0C2B0' }}>
            <p className="font-sans font-bold uppercase mb-1" style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B87040' }}>{c.label}</p>
            <p className="font-serif italic font-light" style={{ fontSize: '1.5rem', color: '#1E1208', lineHeight: 1 }}>{c.value}</p>
            <p className="font-sans font-light mt-1" style={{ fontSize: '0.62rem', color: '#6B4F3A' }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-6 max-w-5xl mx-auto">
        <div className="flex" style={{ borderBottom: '2px solid #D0C2B0' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-5 py-3 font-sans font-bold uppercase transition-colors"
              style={{
                fontSize: '0.6rem', letterSpacing: '0.2em', background: 'none', cursor: 'pointer',
                color: tab === t.id ? '#B87040' : '#6B4F3A',
                borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                borderBottom: tab === t.id ? '2px solid #B87040' : '2px solid transparent',
                marginBottom: '-2px',
              }}>
              {t.label} <span style={{ opacity: 0.6 }}>({t.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-6 py-6 max-w-5xl mx-auto">
        {loading ? (
          <p className="text-center font-sans font-light text-sm py-10" style={{ color: '#6B4F3A' }}>Carregando...</p>
        ) : (

          // ── PRESENÇAS ──────────────────────────────────────────────────────
          tab === 'presencas' ? (
            <>
              {/* Filtros */}
              <div className="flex items-center gap-2 mb-4">
                <span className="font-sans font-bold uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: '#9A7E6A' }}>Filtrar:</span>
                {([['todos', 'Todos', rsvps.length], ['sim', 'Confirmados', confirmados.length], ['nao', 'Não vão', naoVirao.length]] as const).map(([val, label, count]) => (
                  <button key={val} onClick={() => setFiltroPresenca(val)}
                    className="font-sans font-bold uppercase px-3 py-1.5 transition-colors"
                    style={{
                      fontSize: '0.55rem', letterSpacing: '0.18em', cursor: 'pointer',
                      border: '1px solid',
                      borderColor: filtroPresenca === val ? '#B87040' : '#D0C2B0',
                      backgroundColor: filtroPresenca === val ? '#B87040' : 'transparent',
                      color: filtroPresenca === val ? 'white' : '#6B4F3A',
                    }}>
                    {label} ({count})
                  </button>
                ))}
              </div>

              {rsvpsFiltrados.length === 0
                ? <p className="font-sans font-light text-sm text-center py-10" style={{ color: '#6B4F3A' }}>Nenhuma resposta ainda.</p>
                : <div style={{ border: '1px solid #D0C2B0' }}>
                    {/* Header */}
                    <div className="grid gap-3 px-4 py-2.5" style={{ gridTemplateColumns: '1fr 80px 60px 60px 110px', backgroundColor: '#EDE4D8', borderBottom: '1px solid #D0C2B0' }}>
                      {['Nome', 'Presença', 'Adultos', 'Crianças', 'Data'].map(h => (
                        <span key={h} className="font-sans font-bold uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: '#B87040' }}>{h}</span>
                      ))}
                    </div>
                    {rsvpsFiltrados.map((r, i) => (
                      <div key={r.id ?? i}
                        onClick={() => setModalRsvp(r)}
                        className="grid gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-[#F5EFE8]"
                        style={{ gridTemplateColumns: '1fr 80px 60px 60px 110px', borderBottom: '1px solid #EDE4D8' }}>
                        <span className="font-sans text-sm font-light truncate" style={{ color: '#1E1208' }}>{r.nome}</span>
                        <span className="font-sans font-bold uppercase" style={{ fontSize: '0.6rem', color: r.presenca === 'sim' ? '#2E7D32' : '#B87040' }}>
                          {r.presenca === 'sim' ? '✓ Sim' : '✗ Não'}
                        </span>
                        <span className="font-sans text-sm font-light text-center" style={{ color: '#4A3422' }}>{r.adultos ?? '—'}</span>
                        <span className="font-sans text-sm font-light text-center" style={{ color: '#4A3422' }}>{r.criancas ?? '—'}</span>
                        <span className="font-sans text-xs font-light" style={{ color: '#9A7E6A' }}>{r.created_at ? formatDate(r.created_at) : '—'}</span>
                      </div>
                    ))}
                    {/* Total */}
                    <div className="grid gap-3 px-4 py-3" style={{ gridTemplateColumns: '1fr 80px 60px 60px 110px', borderTop: '2px solid #B87040', backgroundColor: '#EDE4D8' }}>
                      <span className="font-sans font-bold uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: '#B87040' }}>
                        Total ({rsvpsFiltrados.length})
                      </span>
                      <span />
                      <span className="font-sans font-bold text-sm text-center" style={{ color: '#1E1208' }}>{totalAdultosFiltro}</span>
                      <span className="font-sans font-bold text-sm text-center" style={{ color: '#1E1208' }}>{totalCriancasFiltro}</span>
                      <span />
                    </div>
                  </div>
              }
            </>

          // ── MENSAGENS ──────────────────────────────────────────────────────
          ) : tab === 'mensagens' ? (
            mensagens.length === 0
              ? <p className="font-sans font-light text-sm text-center py-10" style={{ color: '#6B4F3A' }}>Nenhuma mensagem ainda.</p>
              : <div style={{ border: '1px solid #D0C2B0' }}>
                  <div className="grid gap-3 px-4 py-2.5" style={{ gridTemplateColumns: '140px 1fr 110px', backgroundColor: '#EDE4D8', borderBottom: '1px solid #D0C2B0' }}>
                    {['Nome', 'Mensagem', 'Data'].map(h => (
                      <span key={h} className="font-sans font-bold uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: '#B87040' }}>{h}</span>
                    ))}
                  </div>
                  {mensagens.map((m, i) => (
                    <div key={m.id}
                      onClick={() => setModalMsg(m)}
                      className="grid gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-[#F5EFE8]"
                      style={{ gridTemplateColumns: '140px 1fr 110px', borderBottom: i < mensagens.length - 1 ? '1px solid #EDE4D8' : 'none' }}>
                      <span className="font-sans text-sm font-light truncate" style={{ color: '#1E1208' }}>{m.nome}</span>
                      <span className="font-sans text-sm font-light truncate" style={{ color: '#4A3422' }}>{m.mensagem}</span>
                      <span className="font-sans text-xs font-light" style={{ color: '#9A7E6A' }}>{formatDate(m.created_at)}</span>
                    </div>
                  ))}
                </div>

          // ── PRESENTES ──────────────────────────────────────────────────────
          ) : (
            presentesSummary.length === 0
              ? <p className="font-sans font-light text-sm text-center py-10" style={{ color: '#6B4F3A' }}>Nenhum presente confirmado ainda.</p>
              : <div style={{ border: '1px solid #D0C2B0' }}>
                  <div className="grid gap-3 px-4 py-2.5" style={{ gridTemplateColumns: '1fr 80px 120px 120px', backgroundColor: '#EDE4D8', borderBottom: '1px solid #D0C2B0' }}>
                    {['Presente', 'Cotas', 'Valor unit.', 'Total'].map(h => (
                      <span key={h} className="font-sans font-bold uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: '#B87040' }}>{h}</span>
                    ))}
                  </div>
                  {presentesSummary.map((p, i) => (
                    <div key={p.nome} className="grid gap-3 px-4 py-3"
                      style={{ gridTemplateColumns: '1fr 80px 120px 120px', borderBottom: i < presentesSummary.length - 1 ? '1px solid #EDE4D8' : 'none' }}>
                      <span className="font-sans text-sm font-light" style={{ color: '#1E1208' }}>{p.nome}</span>
                      <span className="font-sans text-sm font-light text-center" style={{ color: '#4A3422' }}>{p.cotas}/10</span>
                      <span className="font-sans text-sm font-light" style={{ color: '#4A3422' }}>{formatBRL(p.valor)}</span>
                      <span className="font-sans text-sm font-bold" style={{ color: '#1E1208' }}>{formatBRL(p.total)}</span>
                    </div>
                  ))}
                  {/* Total */}
                  <div className="grid gap-3 px-4 py-3" style={{ gridTemplateColumns: '1fr 80px 120px 120px', borderTop: '2px solid #B87040', backgroundColor: '#EDE4D8' }}>
                    <span className="font-sans font-bold uppercase col-span-3" style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#B87040' }}>Total arrecadado</span>
                    <span className="font-serif italic font-light" style={{ fontSize: '1.1rem', color: '#1E1208' }}>{formatBRL(totalArrecadado)}</span>
                  </div>
                </div>
          )
        )}
      </div>

      {/* Modal RSVP */}
      {modalRsvp && (
        <Modal title={`Presença — ${modalRsvp.nome}`} onClose={() => setModalRsvp(null)}>
          <Detalhe label="Nome"    value={modalRsvp.nome} />
          <Detalhe label="Presença" value={modalRsvp.presenca === 'sim' ? '✓ Confirmado' : '✗ Não vai'} />
          <Detalhe label="Adultos"  value={modalRsvp.adultos} />
          <Detalhe label="Crianças" value={modalRsvp.criancas} />
          <Detalhe label="Idades"   value={modalRsvp.idades_criancas} />
          <Detalhe label="E-mail"   value={modalRsvp.email} />
          <Detalhe label="Telefone" value={modalRsvp.telefone} />
          <Detalhe label="Mensagem" value={modalRsvp.mensagem} />
          <Detalhe label="Data"     value={modalRsvp.created_at ? formatDate(modalRsvp.created_at) : undefined} />
        </Modal>
      )}

      {/* Modal Mensagem */}
      {modalMsg && (
        <Modal title={`Mensagem — ${modalMsg.nome}`} onClose={() => setModalMsg(null)}>
          <p className="font-serif italic font-light mb-4" style={{ fontSize: '1.05rem', color: '#1E1208', lineHeight: 1.75 }}>
            &ldquo;{modalMsg.mensagem}&rdquo;
          </p>
          <p className="font-sans text-xs font-light" style={{ color: '#9A7E6A' }}>{formatDate(modalMsg.created_at)}</p>
        </Modal>
      )}
    </div>
  )
}
