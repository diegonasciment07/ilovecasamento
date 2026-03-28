'use client'

function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="flex flex-col items-center gap-2 transition-opacity hover:opacity-50 group"
      style={{ color: '#6B4F3A' }}
      aria-label="Voltar ao topo"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
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
        <div className="w-8 h-0.5 mx-auto mt-5 mb-4" style={{ backgroundColor: '#B87040' }} />
        <p className="font-sans font-bold uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.38em', color: '#6B4F3A' }}>
          17 de maio de 2026
        </p>
      </div>

      {/* Voltar ao topo */}
      <div className="py-7 text-center" style={{ borderBottom: '1px solid #D0C2B0', backgroundColor: '#F8F4EF' }}>
        <ScrollToTop />
      </div>

      {/* Rodapé final */}
      <div
        className="px-6 py-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ backgroundColor: '#F8F4EF' }}
      >
        {/* Ícones sociais */}
        <div className="flex items-center gap-3">
          {[
            {
              label: 'Instagram',
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              ),
            },
            {
              label: 'Facebook',
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              ),
            },
          ].map((s) => (
            <a
              key={s.label}
              href="#"
              aria-label={s.label}
              className="w-9 h-9 flex items-center justify-center transition-colors"
              style={{ border: '1px solid #D0C2B0', color: '#6B4F3A' }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        <p className="font-sans font-bold uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#9A7E6A' }}>
          ilovecasamento
        </p>
      </div>
    </footer>
  )
}
