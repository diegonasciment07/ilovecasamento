import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = { title: 'Dicas de Vestimentas | Rafael & Flávia' }

const paletaConvidados = [
  { hex: '#D8C4A8', nome: 'Champagne' },
  { hex: '#C9B49A', nome: 'Nude'      },
  { hex: '#E8DDD0', nome: 'Marfim'    },
  { hex: '#BBA88C', nome: 'Bege'      },
]

export default function DicasVestimentasPage() {
  return (
    <div className="min-h-screen">
      <div className="page-header">
        <span className="eyebrow">Rafael &amp; Flávia</span>
        <h1 className="page-title mt-3">Dicas de vestimentas</h1>
        <div className="divider" />
        <p className="body-text-sm text-center mt-5 max-w-sm mx-auto">
          Preparamos orientações para que todos estejam em harmonia neste dia especial.
        </p>
      </div>

      <div className="px-6 max-w-lg mx-auto">

        {/* Padrinhos */}
        <section className="py-14" style={{ borderBottom: '1px solid #D0C2B0' }}>
          <span className="section-label block text-center mb-8">Padrinhos</span>
          <div className="relative w-full aspect-square overflow-hidden">
            <Image
              src="/images/dicas-padrinho.jpeg"
              alt="Dicas para padrinhos — Terno bege, camisa branca, gravata, lenço e sapato marrom"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Madrinhas */}
        <section className="py-14" style={{ borderBottom: '1px solid #D0C2B0' }}>
          <span className="section-label block text-center mb-8">Madrinhas</span>
          <div className="relative w-full aspect-square overflow-hidden">
            <Image
              src="/images/dicas-madrinha.jpeg"
              alt="Dicas para madrinhas — Vestido longo azul serenity"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Convidados */}
        <section className="py-14" style={{ borderBottom: '1px solid #D0C2B0' }}>
          <span className="section-label block text-center mb-8">Convidados</span>

          <div className="text-center mb-10">
            <p className="font-serif italic font-light mb-1" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: '#1E1208' }}>
              Passeio completo
            </p>
            <p className="body-text-sm text-center">Social / Elegante</p>
          </div>

          {/* Paleta de cores */}
          <div className="mb-10">
            <p className="eyebrow block text-center mb-6" style={{ color: '#B87040' }}>Paleta permitida</p>
            <div className="flex justify-center gap-5">
              {paletaConvidados.map((cor) => (
                <div key={cor.nome} className="flex flex-col items-center gap-2.5">
                  <div
                    className="w-12 h-12"
                    style={{ backgroundColor: cor.hex, border: '1px solid #D0C2B0' }}
                  />
                  <p className="font-sans text-[11px] font-light text-center leading-tight" style={{ color: '#4A3422' }}>
                    {cor.nome}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {[
              { label: 'Convidadas', items: ['Vestidos midi ou longos', 'Conjuntos sociais elegantes', 'Saltos ou sandálias finas'] },
              { label: 'Convidados', items: ['Terno ou blazer social', 'Calça social + camisa', 'Sapatos sociais'] },
            ].map((group) => (
              <div key={group.label}>
                <p className="section-label mb-4">{group.label}</p>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2 items-start body-text-sm">
                      <span className="font-bold shrink-0" style={{ color: '#B87040' }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Por favor, evitar */}
        <section className="py-14">
          <div className="p-8" style={{ backgroundColor: '#120A02' }}>
            <p className="font-sans font-bold uppercase mb-6" style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: 'rgba(212,175,122,0.8)' }}>
              Por gentileza, evitar
            </p>
            <ul className="space-y-4">
              {[
                'Branco ou off-white — reservado à noiva',
                'Azul serenity — reservado às madrinhas',
                'Terno bege — reservado aos padrinhos',
                'Roupas muito informais (jeans, tênis)',
              ].map((item) => (
                <li key={item} className="flex gap-3 font-sans text-sm font-light" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  <span className="font-bold shrink-0" style={{ color: '#B87040' }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="font-serif italic font-light text-center mt-10" style={{ fontSize: '1.25rem', color: '#8B5230', lineHeight: 1.6 }}>
            O mais importante é que você venha<br />com amor no coração!
          </p>
        </section>
      </div>
    </div>
  )
}
