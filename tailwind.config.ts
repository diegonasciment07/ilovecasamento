import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Fundos ──────────────────────────────────────────────
        cream:        '#F8F4EF',    // pergaminho quente — fundo principal
        'cream-light':'#FCF9F5',    // levíssimo — variante clara
        'cream-dark': '#EDE4D8',    // areia aquecida — seções alternadas
        sand:         '#E2D5C3',    // borda / divisor mais forte

        // ── Textos — contraste máximo ────────────────────────────
        espresso:     '#120A02',    // quase preto quente — títulos hero
        'brown-text': '#1E1208',    // texto principal (era #2C1F12, agora mais escuro)
        'brown-mid':  '#4A3422',    // subtítulos / seções (era #5C4535)
        'brown-light':'#6B4F3A',    // labels / captions (era #7A6858)

        // ── Accent — terracotta rico ─────────────────────────────
        taupe:        '#B87040',    // acento principal — terracotta vibrante
        'taupe-dark': '#8B5230',    // hover / activo
        'taupe-light':'#D4AF7A',    // ouro quente — ampersand, destaques

        // ── Bordas ───────────────────────────────────────────────
        'border-color':'#D0C2B0',   // mais visível — linhas de separação
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-lato)', 'Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        // Escala editorial com contraste dramático
        'display':    ['clamp(4rem, 13vw, 9rem)',  { lineHeight: '0.92', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(2.75rem, 7vw, 5rem)',{ lineHeight: '1.0'  }],
        'heading':    ['clamp(2rem, 4.5vw, 3rem)', { lineHeight: '1.15' }],
        'subheading': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.4' }],
        'eyebrow':    ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.4em' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
      },
    },
  },
  plugins: [],
}
export default config
