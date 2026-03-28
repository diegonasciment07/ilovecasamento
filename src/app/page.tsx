import Image from 'next/image'
import Link from 'next/link'
import Countdown from '@/components/Countdown'

/* ── Ornamento com losango central ── */
function DiamondOrnament({ dark = false }: { dark?: boolean }) {
  const color = dark ? 'rgba(255,255,255,0.25)' : '#D0C2B0'
  const accent = dark ? 'rgba(212,175,122,0.8)' : '#B87040'
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="h-px flex-1 max-w-[72px]" style={{ backgroundColor: color }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="7" y="0.5" width="9.2" height="9.2" rx="0.5" transform="rotate(45 7 7)" fill={accent} />
      </svg>
      <div className="h-px flex-1 max-w-[72px]" style={{ backgroundColor: color }} />
    </div>
  )
}

export default function HomePage() {
  return (
    <div>

      {/* ════════════════════════════════════════════════
          HERO — foto full-bleed · assinatura editorial
      ════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[640px] max-h-[1100px] overflow-hidden">

        {/* Foto mobile */}
        <div className="md:hidden absolute inset-0">
          <Image
            src="/images/casal-lago.jpeg"
            alt="Rafael e Flávia"
            fill
            className="object-cover object-[50%_20%]"
            priority
          />
        </div>

        {/* Foto desktop */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/images/casal-danca.jpeg"
            alt="Rafael e Flávia"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Gradiente multicamada — peso visual forte embaixo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120A02]/85 via-[#120A02]/30 to-[#120A02]/15" />

        {/* Conteúdo — alinhado à base */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-14 md:pb-20 text-center">

          {/* Data acima do nome */}
          <p className="eyebrow-light tracking-[0.45em] mb-6 block">
            17 de maio de 2026
          </p>

          {/* Nome do casal — hero visual */}
          <h1 className="couple-name">
            Rafael <span className="ampersand">&amp;</span> Flávia
          </h1>

          {/* Linha + local */}
          <div className="flex items-center justify-center gap-4 mt-7 mb-0">
            <div className="h-px w-10 bg-white/25" />
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/55 font-light">
              Chácara Lagos Italy · São José dos Pinhais, PR
            </p>
            <div className="h-px w-10 bg-white/25" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CONTAGEM REGRESSIVA — seção escura editorial
      ════════════════════════════════════════════════ */}
      <section className="bg-[#120A02] py-16 md:py-20 px-6 text-center">
        <p className="eyebrow-light mb-3 block">Faltam apenas</p>
        <p className="font-serif text-lg md:text-xl font-light text-white/50 italic mb-10">
          até o grande dia
        </p>
        <Countdown />
        <div className="mt-10">
          <DiamondOrnament dark />
        </div>
        <p className="font-serif text-xl italic font-light text-[#D4AF7A] mt-2">
          Uma promessa para a eternidade
        </p>
      </section>

      {/* ════════════════════════════════════════════════
          EDITORIAL SPLIT — texto + foto
      ════════════════════════════════════════════════ */}
      <section className="md:grid md:grid-cols-2 min-h-[520px]">

        {/* Coluna foto — ordem 2 no mobile, 1 no desktop */}
        <div className="order-2 md:order-1 relative aspect-[4/3] md:aspect-auto min-h-[320px]">
          <Image
            src="/images/casal-cerca.jpeg"
            alt="Rafael e Flávia"
            fill
            className="object-cover object-[50%_30%]"
          />
          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-[#120A02]/10" />
        </div>

        {/* Coluna texto — ordem 1 no mobile */}
        <div className="order-1 md:order-2 bg-[#EDE4D8] flex flex-col justify-center px-8 md:px-14 py-14 md:py-16">
          <span className="eyebrow block mb-5">Rafael &amp; Flávia</span>
          <h2 className="font-serif text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] font-light italic leading-[1.05] text-[#1E1208] mb-6">
            Sejam bem-vindos<br />à nossa celebração
          </h2>
          <div className="w-10 h-0.5 bg-[#B87040] mb-6" />
          <p className="body-text mb-4 max-w-md">
            Estamos muito felizes em ter vocês fazendo parte deste momento tão especial.
            Aqui você encontra todos os detalhes do nosso casamento.
          </p>
          <p className="body-text mb-8 max-w-md">
            Que Deus abençoe cada um de vocês que estarão ao nosso lado neste dia de tanta alegria.
          </p>
          <div>
            <Link href="/nossa-historia" className="btn-outline">
              Nossa história
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          GALERIA — grade assimétrica
      ════════════════════════════════════════════════ */}
      <section>
        <div className="grid grid-cols-3 grid-rows-2 h-[400px] md:h-[560px]">

          {/* Foto grande — col 1-2, row 1-2 */}
          <div className="col-span-2 row-span-2 relative overflow-hidden group">
            <Image
              src="/images/casal-caminho.jpeg"
              alt="Rafael e Flávia caminhando"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[#120A02]/0 group-hover:bg-[#120A02]/15 transition-colors duration-500" />
          </div>

          {/* Foto pequena 1 — col 3, row 1 */}
          <div className="relative overflow-hidden group border-l border-b border-[#D0C2B0]/30">
            <Image
              src="/images/casal-ponte.jpeg"
              alt="Rafael e Flávia na ponte"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-[#120A02]/0 group-hover:bg-[#120A02]/15 transition-colors duration-500" />
          </div>

          {/* Foto pequena 2 — col 3, row 2 */}
          <div className="relative overflow-hidden group border-l border-[#D0C2B0]/30">
            <Image
              src="/images/casal-moinho.jpeg"
              alt="Rafael e Flávia"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-[#120A02]/0 group-hover:bg-[#120A02]/15 transition-colors duration-500" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          VERSÍCULO — cream-dark band
      ════════════════════════════════════════════════ */}
      <section className="bg-[#EDE4D8] py-16 md:py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-8 h-0.5 bg-[#B87040] mx-auto mb-8" />
          <p className="font-serif italic font-light text-[#1E1208]" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.7rem)', lineHeight: 1.65 }}>
            &ldquo;O amor é paciente, o amor é bondoso. Não inveja, não se vangloria,
            não se orgulha.&rdquo;
          </p>
          <p className="eyebrow text-[#B87040] mt-5 block" style={{ letterSpacing: '0.3em' }}>
            1 Coríntios 13:4
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CONFIRMAR PRESENÇA — CTA dark
      ════════════════════════════════════════════════ */}
      <section className="bg-[#120A02] py-20 md:py-28 px-6 text-center relative overflow-hidden">
        {/* Textura sutil de fundo */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px)' }}
        />

        <div className="relative">
          <p className="eyebrow-light mb-4 block">17 de maio de 2026</p>
          <h2 className="font-serif italic font-light text-white mb-2"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.1 }}>
            Você vai estar lá?
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4 mb-8">
            <div className="h-px w-10 bg-white/20" />
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="5" y="0.5" width="6.4" height="6.4" rx="0.5" transform="rotate(45 5 5)" fill="#D4AF7A" fillOpacity="0.7" />
            </svg>
            <div className="h-px w-10 bg-white/20" />
          </div>
          <p className="body-text-light mb-10 max-w-sm mx-auto">
            Confirme sua presença até <strong className="text-white font-normal">10 de maio</strong> e
            ajude-nos a preparar tudo com carinho.
          </p>
          <Link href="/confirmar-presenca" className="btn-ghost">
            Confirmar presença
          </Link>
        </div>
      </section>

    </div>
  )
}
