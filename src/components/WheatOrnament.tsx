interface WheatOrnamentProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export default function WheatOrnament({
  size = 'md',
  color = 'currentColor',
  className = '',
}: WheatOrnamentProps) {
  const widths = { sm: 72, md: 100, lg: 130 }
  const w = widths[size]
  const h = Math.round(w * 0.26)
  const cy = h / 2

  // Escala todos os elementos proporcionalmente
  const s = w / 100

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 100 ${Math.round(100 * 0.26)}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* ── Linha horizontal esquerda ── */}
      <line x1="0" y1="13" x2="18" y2="13" stroke={color} strokeWidth="0.7" />

      {/* ── Seta / arrowhead esquerdo ── */}
      <polyline
        points="16,8 8,13 16,18"
        stroke={color}
        strokeWidth="0.7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* ── Folhas / grãos de trigo (overlapping leaves) ── */}
      {/* leaf 1 — menor, início */}
      <path
        d="M28 13 C25 9 20 10 21 13 C20 16 25 17 28 13Z"
        stroke={color} strokeWidth="0.65" fill="none"
      />
      {/* leaf 2 */}
      <path
        d="M36 13 C32 8 27 9 28 13 C27 17 32 18 36 13Z"
        stroke={color} strokeWidth="0.65" fill="none"
      />
      {/* leaf 3 — central, maior */}
      <path
        d="M46 13 C41 7 36 8 36 13 C36 18 41 19 46 13Z"
        stroke={color} strokeWidth="0.65" fill="none"
      />
      {/* leaf 4 — central, maior */}
      <path
        d="M56 13 C51 7 46 8 46 13 C46 18 51 19 56 13Z"
        stroke={color} strokeWidth="0.7" fill="none"
      />
      {/* leaf 5 */}
      <path
        d="M65 13 C60 8 55 9 56 13 C55 17 60 18 65 13Z"
        stroke={color} strokeWidth="0.65" fill="none"
      />
      {/* leaf 6 */}
      <path
        d="M73 13 C69 9 64 10 65 13 C64 16 69 17 73 13Z"
        stroke={color} strokeWidth="0.65" fill="none"
      />

      {/* ── Linha horizontal direita ── */}
      <line x1="73" y1="13" x2="100" y2="13" stroke={color} strokeWidth="0.7" />
    </svg>
  )
}
