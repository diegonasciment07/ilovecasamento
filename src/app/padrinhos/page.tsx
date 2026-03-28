import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = { title: 'Padrinhos | Rafael & Flávia' }

const padrinhos = [
  { nome: 'Padrinho 1', papel: 'Padrinho' },
  { nome: 'Padrinha 1', papel: 'Madrinha' },
  { nome: 'Padrinho 2', papel: 'Padrinho' },
  { nome: 'Padrinha 2', papel: 'Madrinha' },
]

function PersonIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B87040" strokeWidth="1">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

export default function PadrinhosPage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="Padrinhos" subtitle="Pessoas especiais que escolhemos para caminhar ao nosso lado neste dia." />

      <section className="px-6 py-14 md:py-20 max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          {padrinhos.map((p, i) => (
            <div key={i} className="text-center">
              {/* Avatar placeholder */}
              <div
                className="w-full aspect-square mx-auto mb-5 flex items-center justify-center"
                style={{ backgroundColor: '#EDE4D8', border: '1px solid #D0C2B0' }}
              >
                <PersonIcon />
              </div>
              <p className="font-serif italic font-light text-xl mb-1" style={{ color: '#1E1208' }}>
                {p.nome}
              </p>
              <p className="eyebrow" style={{ color: '#B87040' }}>{p.papel}</p>
            </div>
          ))}
        </div>

        <div className="verse-block">
          <p className="verse-text">
            &ldquo;O amigo fiel é refúgio seguro; quem o encontra, encontrou um tesouro.&rdquo;
          </p>
          <span className="verse-ref">Eclesiástico 6:14</span>
        </div>
      </section>
    </div>
  )
}
