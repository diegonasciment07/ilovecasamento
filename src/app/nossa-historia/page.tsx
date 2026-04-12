import type { Metadata } from 'next'
import Image from 'next/image'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = { title: 'Nossa História | Rafael & Flávia' }

export default function NossaHistoriaPage() {
  return (
    <div className="min-h-screen">

      <PageHeader title="Nossa história" />

      {/* A história */}
      <section className="px-6 py-12 md:py-16 max-w-2xl mx-auto">

        {/* Foto principal */}
        <div className="relative w-full aspect-[4/3] overflow-hidden mb-12">
          <Image
            src="/images/casal-ponte.jpeg"
            alt="Rafael e Flávia na ponte"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6 body-text">
          <p>
            Nossa história começou em abril de 2024, na igreja, de uma forma simples, mas completamente
            dirigida por Deus. Após um post do nosso Bispo, nossos caminhos se cruzaram.
          </p>
          <p>
            Naquele momento, ambos estávamos{' '}
            <em className="font-serif text-[1.15em] not-italic" style={{ color: '#B87040' }}>&ldquo;na planta&rdquo;</em>.
            Tínhamos disposição para cuidar de vidas, servir e viver o propósito, mas ainda éramos
            processos em construção. Carregávamos os mesmos valores, o mesmo desejo de crescer em Deus
            e a mesma convicção de que relacionamento não é sobre emoção passageira, mas sobre propósito eterno.
          </p>
          <p>
            Alinhamos nossos objetivos e começamos a orar. Antes de qualquer passo, colocamos Deus à frente.
            Decidimos que, se fosse para viver algo juntos, seria debaixo da vontade d&apos;Ele.
          </p>
          <p>
            Em junho, Rafael pediu Flávia em namoro. Não foi apenas um pedido, foi uma decisão fundamentada
            na Palavra. Ele citou Efésios 5, entendendo que amar é uma decisão diária, independente do sentimento.
            Aprendemos que o amor verdadeiro não se sustenta apenas na emoção, mas na decisão de cuidar, honrar
            e permanecer — assim como Cristo nos ensinou.
          </p>
        </div>

        {/* Foto moinho */}
        <div className="relative w-full aspect-[3/4] overflow-hidden my-12">
          <Image src="/images/casal-moinho.jpeg" alt="Rafael e Flávia" fill className="object-cover object-top" />
        </div>

        <div className="space-y-6 body-text">
          <p>
            Desde o início, nosso relacionamento foi construído sobre oração, direção e confirmação. Cada passo
            foi validado pelo nosso crescimento em Deus. As respostas vieram através do amadurecimento espiritual,
            da paz no coração e do alinhamento de propósito.
          </p>
        </div>

        {/* Versículo */}
        <div className="verse-block">
          <p className="verse-text">
            &ldquo;Nem olhos viram, nem ouvidos ouviram, nem jamais penetrou em coração humano o que Deus tem preparado para aqueles que o amam.&rdquo;
          </p>
          <span className="verse-ref">1 Coríntios 2:9</span>
        </div>

        <div className="space-y-6 body-text">
          <p>
            Hoje estamos líderes de célula, cuidamos de vidas e temos sonhos muito maiores do que tínhamos
            no começo. Crescemos. Amadurecemos mentalmente e espiritualmente. O que começou como uma semente,
            hoje floresce como uma aliança firmada em Deus.
          </p>
          <p>
            Escolhemos viver a santidade. Vamos nos casar virgens, guardando nosso coração e nosso corpo.
            Nosso primeiro beijo será no altar — não como um símbolo de espera apenas, mas como a celebração
            de uma promessa vivida com fé, renúncia e convicção.
          </p>
          <p>
            Nossa história não é apenas sobre nós dois. É sobre propósito. É sobre obediência. É sobre decidir
            amar todos os dias. E acima de tudo, é sobre Deus sendo o centro, o fundamento e o futuro da nossa família.
          </p>
        </div>

        {/* Foto dançando */}
        <div className="relative w-full aspect-[3/4] overflow-hidden mt-12">
          <Image src="/images/casal-danca.jpeg" alt="Rafael e Flávia dançando" fill className="object-cover" />
        </div>
      </section>

      {/* Os noivos — dark divider section */}
      <div className="h-px w-full" style={{ backgroundColor: '#D0C2B0' }} />

      <section className="px-6 py-14 md:py-20 max-w-2xl mx-auto">

        <div className="text-center mb-12">
          <span className="eyebrow block mb-4">Os noivos</span>
          <h2 className="font-serif italic font-light" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#1E1208' }}>
            Quem somos nós
          </h2>
          <div className="w-8 h-0.5 mx-auto mt-5" style={{ backgroundColor: '#B87040' }} />
        </div>

        {/* Rafael */}
        <div className="mb-16">
          <div className="relative w-44 h-44 rounded-full mx-auto mb-6 overflow-hidden" style={{ boxShadow: '0 0 0 3px #D0C2B0' }}>
            <Image src="/images/rafael-noivo.jpeg" alt="Rafael" fill className="object-cover" style={{ objectPosition: '50% 15%', transform: 'scale(1.15)', transformOrigin: '50% 15%' }} />
          </div>
          <h3 className="font-serif italic text-3xl font-light text-center mb-1" style={{ color: '#1E1208' }}>Rafael</h3>
          <p className="eyebrow text-center mb-8">24 anos</p>

          <div className="space-y-5 body-text">
            <p>
              Quando conheci Jesus através do Ministério Alvo, eu não tinha nada e, honestamente, sentia
              que não era ninguém. Mas Deus promoveu uma mudança radical na minha mente e na minha história.
              Hoje, Ele é a motivação diária pela qual escolho o matrimônio.
            </p>
            <p>
              Minha carreira profissional é fruto do que aprendi servindo ao Senhor. Comecei na comunicação
              visual, mas Ele me levou além: ensinou-me a lidar com pessoas, a cuidar e a investir em vidas.
              Hoje, na área comercial, o que mais me realiza é aplicar os ensinamentos de Cristo no trato com cada cliente.
            </p>
            <p>
              No entanto, eu não trilhei esse caminho sozinho. Como um jovem solteiro e &ldquo;cabeça de
              vento&rdquo;, eu não conseguia enxergar o futuro com clareza. Foi então que a Flávia chegou
              como um furacão, revirando o meu mundo e me impulsionando a correr.
            </p>
            <p>
              Sou grato porque minha futura esposa é a resposta exata do que pedi ao Senhor: crescimento.
              Deus me entregou a Flávia com cada detalhe que um dia orei.
            </p>
            <p className="font-serif italic" style={{ color: '#8B5230', fontSize: '1.1rem' }}>
              E o mais importante de tudo, obrigado, Jesus, por ser o autor e o consumador de toda essa história!
            </p>
          </div>
        </div>

        {/* Divisor */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-1 h-px" style={{ backgroundColor: '#D0C2B0' }} />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="6" y="0.5" width="7.8" height="7.8" rx="0.5" transform="rotate(45 6 6)" fill="#B87040" fillOpacity="0.6" />
          </svg>
          <div className="flex-1 h-px" style={{ backgroundColor: '#D0C2B0' }} />
        </div>

        {/* Flávia */}
        <div>
          <div className="relative w-44 h-44 rounded-full mx-auto mb-6 overflow-hidden" style={{ boxShadow: '0 0 0 3px #D0C2B0' }}>
            <Image src="/images/flavia-noiva.jpeg" alt="Flávia" fill className="object-cover" style={{ objectPosition: '50% 15%', transform: 'scale(1.15)', transformOrigin: '50% 15%' }} />
          </div>
          <h3 className="font-serif italic text-3xl font-light text-center mb-1" style={{ color: '#1E1208' }}>Flávia</h3>
          <p className="eyebrow text-center mb-8">24 anos</p>

          <div className="space-y-5 body-text">
            <p>
              Eu sou a Flávia, tenho 24 anos. Loira, &ldquo;odonto&rdquo;, violeira e completamente apaixonada por Jesus.
            </p>
            <p>
              Sou intensa. Carrego alegria, mas também convicção. Gosto de brincar com uma frase que,
              no fundo, carrega uma grande verdade sobre quem eu me tornei:
            </p>
            <blockquote className="pl-5 py-2 my-6" style={{ borderLeft: '3px solid #B87040' }}>
              <p className="font-serif italic font-light leading-relaxed" style={{ fontSize: '1.2rem', color: '#1E1208' }}>
                &ldquo;Vós, maridos, amai vossas mulheres, como também Cristo amou a igreja, e a si mesmo se entregou por ela.&rdquo;
              </p>
              <span className="verse-ref" style={{ display: 'block', marginTop: '0.5rem' }}>Efésios 5:25</span>
            </blockquote>
            <p>
              Sou decidida e ambiciosa. Sonho grande e busco excelência em tudo o que faço. Minha profissão
              se tornou muito mais especial quando entendi que Deus poderia me usar não só pra cuidar de sorrisos, mas de almas.
            </p>
            <p>
              Servir, cuidar e viver um propósito é o meu maior objetivo. A luz de Jesus me encontrou e
              hoje eu vivo pela graça, entendendo que não foi de graça — foi por amor.
            </p>
            <p className="font-serif italic" style={{ color: '#8B5230', fontSize: '1.1rem' }}>
              Um amor alinhado com meus valores, confirmado em oração e construído com propósito.
            </p>
          </div>
        </div>

        {/* Foto final */}
        <div className="relative w-full aspect-video overflow-hidden mt-14">
          <Image src="/images/casal-caminho.jpeg" alt="Rafael e Flávia caminhando juntos" fill className="object-cover" />
        </div>
      </section>
    </div>
  )
}
