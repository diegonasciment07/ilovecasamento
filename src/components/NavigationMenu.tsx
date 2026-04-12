'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

interface NavigationMenuProps {
  isOpen: boolean
  onClose: () => void
}

const pages = [
  { href: '/',                  label: 'Página inicial'       },
  { href: '/nossa-historia',    label: 'Nossa história'       },
  { href: '/mensagens',         label: 'Mensagens aos noivos' },
  { href: '/cerimonia',         label: 'Cerimônia'            },
  { href: '/dicas-vestimentas', label: 'Dicas de vestimentas' },
]

const gifts = [
  { href: '/lista-presentes', label: 'Lista de presentes' },
]

export default function NavigationMenu({ isOpen, onClose }: NavigationMenuProps) {
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ease-in-out ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ backgroundColor: '#F8F4EF' }}
    >
      {/* Header */}
      <div
        className="h-14 flex items-center px-5 justify-between"
        style={{ borderBottom: '1px solid #D0C2B0' }}
      >
        <Link
          href="/"
          onClick={onClose}
          className="font-serif italic text-base font-light"
          style={{ color: '#1E1208', letterSpacing: '0.08em' }}
        >
          Rafael &amp; Flávia
        </Link>
        <button
          onClick={onClose}
          className="p-2 -mr-2 transition-opacity hover:opacity-50"
          style={{ color: '#1E1208' }}
          aria-label="Fechar menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Conteúdo */}
      <div className="px-8 py-10 overflow-y-auto h-[calc(100vh-56px)]">

        {/* Grupo Páginas */}
        <div className="mb-10">
          <p className="font-sans font-bold uppercase mb-5" style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: '#B87040' }}>
            Páginas
          </p>
          <ul>
            {pages.map((page) => (
              <li key={page.href} style={{ borderBottom: '1px solid #D0C2B0' }}>
                <Link
                  href={page.href}
                  onClick={onClose}
                  className="block font-sans py-4 transition-opacity hover:opacity-60"
                  style={{
                    fontSize: '1.05rem',
                    color: '#1E1208',
                    fontWeight: pathname === page.href ? 600 : 300,
                  }}
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Grupo Presentes */}
        <div className="mb-10">
          <p className="font-sans font-bold uppercase mb-5" style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: '#B87040' }}>
            Presentes
          </p>
          <ul>
            {gifts.map((gift) => (
              <li key={gift.href} style={{ borderBottom: '1px solid #D0C2B0' }}>
                <Link
                  href={gift.href}
                  onClick={onClose}
                  className="block font-sans py-4 transition-opacity hover:opacity-60"
                  style={{ fontSize: '1.05rem', color: '#1E1208', fontWeight: 300 }}
                >
                  {gift.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Confirmar presença — destaque */}
        <Link
          href="/confirmar-presenca"
          onClick={onClose}
          className="block w-full text-center font-sans font-bold uppercase py-4 transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#B87040', color: 'white', fontSize: '0.7rem', letterSpacing: '0.25em' }}
        >
          Confirmar presença
        </Link>

        {/* Assinatura */}
        <div className="mt-14 text-center">
          <p className="font-serif italic font-light" style={{ fontSize: '1.35rem', color: '#6B4F3A' }}>
            Rafael &amp; Flávia
          </p>
          <p className="font-sans font-light mt-1" style={{ fontSize: '0.7rem', letterSpacing: '0.25em', color: '#9A7E6A', textTransform: 'uppercase' }}>
            17 de maio de 2026
          </p>
        </div>
      </div>
    </div>
  )
}
