'use client'

import { useState, useEffect } from 'react'

interface TimeLeft {
  dias: number
  horas: number
  minutos: number
  segundos: number
}

const WEDDING_DATE = new Date('2026-05-17T16:00:00-03:00')

function calculateTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - new Date().getTime()
  if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0 }
  return {
    dias:     Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas:    Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos:  Math.floor((diff / 1000 / 60) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  }
}

function TimeUnit({ value, label }: { value: number | string; label: string }) {
  const display = typeof value === 'number' ? String(value).padStart(2, '0') : value
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-serif font-light text-white tabular-nums"
        style={{ fontSize: 'clamp(2rem, 7vw, 5.5rem)', lineHeight: 1 }}
      >
        {display}
      </span>
      <span
        className="font-sans uppercase font-bold text-white/40 mt-2 tracking-[0.1em] md:tracking-[0.35em]"
        style={{ fontSize: '0.6rem' }}
      >
        {label}
      </span>
    </div>
  )
}

function Colon() {
  return (
    <span
      className="font-serif font-light text-white/20 self-start"
      style={{ fontSize: 'clamp(1.25rem, 4.5vw, 3.5rem)', lineHeight: 1, marginTop: '0.1em' }}
    >
      :
    </span>
  )
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  const t = timeLeft

  return (
    <div className="flex items-end justify-center gap-2 md:gap-10">
      <TimeUnit value={t ? t.dias     : '--'} label="Dias"     />
      <Colon />
      <TimeUnit value={t ? t.horas    : '--'} label="Horas"    />
      <Colon />
      <TimeUnit value={t ? t.minutos  : '--'} label="Minutos"  />
      <Colon />
      <TimeUnit value={t ? t.segundos : '--'} label="Segundos" />
    </div>
  )
}
