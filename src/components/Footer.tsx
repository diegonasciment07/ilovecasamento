'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import WheatOrnament from './WheatOrnament'

function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="flex flex-col items-center gap-2 transition-opacity hover:opacity-50 group"
      style={{ color: '#6B4F3A' }}
      aria-label="Voltar ao topo"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        className="group-hover:-translate-y-1 transition-transform">
        <polyline points="18 15 12 9 6 15" />
      </svg>
      <span className="font-sans font-bold uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}>
        Voltar ao topo
      </span>
    </button>
  )
}

const socials = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    href: '#',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.64 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.568 0-2.386-1.715-4.054-4.163-4.054-2.837 0-4.5 2.127-4.5 4.326 0 .856.33 1.775.741 2.276a.3.3 0 0 1 .069.288l-.276 1.125c-.044.18-.146.218-.337.131C5.93 14.55 5 13.014 5 11.172 5 8.05 7.388 5.2 11.62 5.2c3.414 0 6.067 2.432 6.067 5.684 0 3.394-2.14 6.124-5.11 6.124-1 0-1.94-.52-2.26-1.133l-.616 2.298c-.223.858-.826 1.932-1.23 2.587.928.287 1.91.443 2.929.443 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const [totalRsvp, setTotalRsvp] = useState<number | null>(null)

  useEffect(() => {
    async function fetchCount() {
      const { count } = await supabase
        .from('rf_rsvp')
        .select('*', { count: 'exact', head: true })
      if (count !== null) setTotalRsvp(count)
    }
    fetchCount()
  }, [])

  return (
    <footer style={{ borderTop: '1px solid #D0C2B0' }}>

      {/* Assinatura principal */}
      <div className="py-14 text-center" style={{ backgroundColor: '#EDE4D8', borderBottom: '1px solid #D0C2B0' }}>
        <p className="font-serif italic font-light" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', color: '#1E1208', lineHeight: 1.1 }}>
          Rafael &amp; Flávia
        </p>
        <div className="flex justify-center mt-5 mb-5" style={{ color: '#B87040', opacity: 0.7 }}>
          <WheatOrnament size="md" color="#B87040" />
        </div>
        <p className="font-sans font-bold uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.38em', color: '#6B4F3A' }}>
          17 de maio de 2026
        </p>
      </div>

      {/* Voltar ao topo */}
      <div className="py-7 flex justify-center" style={{ borderBottom: '1px solid #D0C2B0', backgroundColor: '#F8F4EF' }}>
        <ScrollToTop />
      </div>

      {/* Rodapé final */}
      <div
        className="px-6 py-5 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ backgroundColor: '#F8F4EF' }}
      >
        {/* Ícones sociais */}
        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="w-9 h-9 flex items-center justify-center transition-all hover:opacity-60"
              style={{ border: '1px solid #D0C2B0', color: '#6B4F3A' }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Contador */}
        <p className="font-sans font-light text-center" style={{ fontSize: '0.8rem', color: '#6B4F3A' }}>
          {totalRsvp !== null && totalRsvp > 0
            ? <><strong style={{ color: '#1E1208', fontWeight: 600 }}>{totalRsvp}</strong> {totalRsvp === 1 ? 'convidado já confirmou presença!' : 'convidados já confirmaram presença!'}</>
            : 'Confirme sua presença e faça parte desse momento!'
          }
        </p>

        {/* Marca + engrenagem */}
        <div className="flex items-center gap-3">
          <p className="font-sans font-bold uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#9A7E6A' }}>
            ilovecasamento
          </p>
          <a href="/gestao" aria-label="Gestão" title="Gestão" className="transition-opacity hover:opacity-60"
            style={{ color: '#8B6B50' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
