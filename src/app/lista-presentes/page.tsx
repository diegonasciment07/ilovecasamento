import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = { title: 'Lista de Presentes | Rafael & Flávia' }

const categorias = [
  {
    nome: 'Cozinha',
    itens: ['Jogo de panelas', 'Batedeira', 'Jogo de pratos (6 peças)', 'Conjunto de facas'],
  },
  {
    nome: 'Sala',
    itens: ['Jogo de sofá', 'Mesa de jantar', 'Quadro decorativo'],
  },
  {
    nome: 'Quarto',
    itens: ['Jogo de cama king (300 fios)', 'Edredom', 'Almofadas decorativas'],
  },
  {
    nome: 'Banheiro',
    itens: ['Jogo de toalhas (6 peças)', 'Tapete de banheiro'],
  },
]

export default function ListaPresentes() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Lista de presentes"
        subtitle="A melhor forma de nos presentear é com sua presença. Mas se quiser nos ajudar a construir nosso lar, ficamos muito gratos!"
      />

      <section className="px-6 pt-12 max-w-lg mx-auto">

        {/* Aviso lista em loja */}
        <div className="text-center mb-14 p-7" style={{ backgroundColor: '#EDE4D8', border: '1px solid #D0C2B0' }}>
          <p className="section-label mb-3" style={{ color: '#B87040' }}>Lista em loja</p>
          <p className="body-text-sm text-center">
            Em breve disponibilizaremos o link direto para nossa lista em loja.
          </p>
        </div>

        {/* Categorias */}
        <div className="space-y-12">
          {categorias.map((cat) => (
            <div key={cat.nome}>
              <p className="section-label pb-3 mb-4" style={{ borderBottom: '2px solid #B87040' }}>
                {cat.nome}
              </p>
              <ul>
                {cat.itens.map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between py-3.5"
                    style={{ borderBottom: '1px solid #D0C2B0' }}
                  >
                    <span className="body-text-sm">{item}</span>
                    <span
                      className="font-sans text-[10px] font-bold uppercase"
                      style={{ letterSpacing: '0.2em', color: '#B87040', backgroundColor: 'rgba(184,112,64,0.08)', padding: '4px 10px' }}
                    >
                      disponível
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* PIX */}
        <div className="mt-16" style={{ borderTop: '1px solid #D0C2B0', paddingTop: '3rem', paddingBottom: '4rem', textAlign: 'center' }}>
          <p className="section-label mb-8">Ou contribua via PIX</p>
          <div className="p-7" style={{ backgroundColor: '#EDE4D8', border: '1px solid #D0C2B0' }}>
            <p className="eyebrow block mb-3" style={{ color: '#6B4F3A' }}>Chave PIX</p>
            <p className="font-serif italic font-light" style={{ fontSize: '1.25rem', color: '#1E1208' }}>
              (chave PIX em breve)
            </p>
          </div>
          <p className="body-text-sm text-center mt-5">
            Todo presente, grande ou pequeno, é recebido com muito amor.
          </p>
        </div>

        {/* Versículo */}
        <div className="verse-block">
          <p className="verse-text">&ldquo;Que cada dom perfeito vem do alto.&rdquo;</p>
          <span className="verse-ref">Tiago 1:17</span>
        </div>
      </section>
    </div>
  )
}
