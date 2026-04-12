'use client'

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

export default function Footer() {

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
        className="px-6 py-5 flex items-center justify-center"
        style={{ backgroundColor: '#F8F4EF' }}
      >
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
