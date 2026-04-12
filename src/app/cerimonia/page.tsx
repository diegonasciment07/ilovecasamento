import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = { title: 'Cerimônia | Rafael & Flávia' }

export default function CerimoniaPage() {
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Chácara+Lagos+Italy+R.+Júlio+César+Setenareski+2493+Mergulhão+São+José+dos+Pinhais+PR'

  return (
    <div className="min-h-screen">
      <PageHeader title="Cerimônia" />

      <section className="px-6 py-14 md:py-20 max-w-lg mx-auto">

        {/* Data — tipografia editorial grande */}
        <div className="text-center mb-12">
          <span className="eyebrow block mb-5">Data</span>
          <p
            className="font-serif font-light"
            style={{ fontSize: 'clamp(5rem, 18vw, 8rem)', lineHeight: 0.9, color: '#1E1208' }}
          >
            17
          </p>
          <p className="font-serif text-2xl md:text-3xl font-light italic mt-3" style={{ color: '#1E1208' }}>
            de maio de 2026
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-8" style={{ backgroundColor: '#D0C2B0' }} />
            <span className="eyebrow" style={{ color: '#B87040' }}>Domingo</span>
            <div className="h-px w-8" style={{ backgroundColor: '#D0C2B0' }} />
          </div>
          <p className="font-serif font-light italic mt-3" style={{ fontSize: '1.5rem', color: '#B87040' }}>
            10h30
          </p>
        </div>

        <div className="w-full h-px mb-12" style={{ backgroundColor: '#D0C2B0' }} />

        {/* Local */}
        <div className="text-center mb-12">
          <span className="eyebrow block mb-5">Local</span>
          <p className="font-serif font-light italic mb-3" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.25rem)', color: '#1E1208' }}>
            Chácara Lagos Italy
          </p>
          <p className="body-text-sm text-center">
            R. Júlio César Setenareski, 2493<br />
            Mergulhão — São José dos Pinhais, PR
          </p>
        </div>

        <div className="text-center mb-12">
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
            Ver no mapa
          </a>
        </div>

        <div className="w-full h-px mb-12" style={{ backgroundColor: '#D0C2B0' }} />

        {/* Informações */}
        <div className="space-y-8">
          {[
            { label: 'Horário',             text: '10h30 — início da cerimônia' },
            { label: 'Cerimônia religiosa', text: 'Realizada no local — traje passeio completo' },
            { label: 'Recepção',            text: 'Logo após a cerimônia, no mesmo local' },
            { label: 'Confirmação de presença', text: 'Até 13 de abril de 2026' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col md:flex-row md:items-baseline md:gap-6">
              <p className="section-label md:w-44 shrink-0 mb-1 md:mb-0">{item.label}</p>
              <p className="body-text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Versículo */}
        <div className="verse-block">
          <p className="verse-text">&ldquo;O que Deus uniu, o homem não separe.&rdquo;</p>
          <span className="verse-ref">Marcos 10:9</span>
        </div>
      </section>
    </div>
  )
}
