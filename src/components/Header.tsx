'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import NavigationMenu from './NavigationMenu'

const pagesLinks = [
  { href: '/',                  label: 'Página inicial'       },
  { href: '/nossa-historia',    label: 'Nossa história'       },
  { href: '/mensagens',         label: 'Mensagens aos noivos' },
  { href: '/cerimonia',         label: 'Cerimônia'            },
  { href: '/dicas-vestimentas', label: 'Dicas de vestimentas' },
]

const giftLinks = [
  { href: '/lista-presentes', label: 'Lista de presentes' },
]

function ChevronDown() {
  return (
    <svg width="9" height="9" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 opacity-50">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center"
        style={{ backgroundColor: 'rgba(248,244,239,0.96)', borderBottom: '1px solid #D0C2B0', backdropFilter: 'blur(8px)' }}
      >
        <div className="w-full px-5 lg:px-10 flex items-center justify-between max-w-6xl mx-auto">

          {/* Logo / assinatura */}
          <Link
            href="/"
            className="font-serif italic text-base font-light tracking-wide hover:opacity-70 transition-opacity"
            style={{ color: '#1E1208', letterSpacing: '0.08em' }}
          >
            Rafael &amp; Flávia
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Páginas',   links: pagesLinks },
              { label: 'Presentes', links: giftLinks  },
            ].map((group) => (
              <div key={group.label} className="relative group">
                <button
                  className="flex items-center gap-1.5 font-sans font-bold uppercase transition-colors py-4"
                  style={{ fontSize: '0.65rem', letterSpacing: '0.22em', color: '#4A3422' }}
                >
                  {group.label} <ChevronDown />
                </button>
                {/* Dropdown */}
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  style={{ backgroundColor: '#F8F4EF', border: '1px solid #D0C2B0', boxShadow: '0 8px 24px rgba(18,10,2,0.10)' }}
                >
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-5 py-3.5 font-sans text-sm transition-colors"
                      style={{
                        borderBottom: '1px solid #D0C2B0',
                        color: pathname === link.href ? '#B87040' : '#1E1208',
                        fontWeight: pathname === link.href ? 600 : 300,
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Link
              href="/confirmar-presenca"
              className="font-sans font-bold uppercase transition-colors"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.22em',
                color: pathname === '/confirmar-presenca' ? '#B87040' : '#4A3422',
              }}
            >
              Confirmar presença
            </Link>
          </nav>

          {/* Hamburger mobile */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-2 group"
            aria-label="Abrir menu"
          >
            <span className="block w-5 h-px transition-colors" style={{ backgroundColor: '#1E1208' }} />
            <span className="block w-3.5 h-px transition-colors" style={{ backgroundColor: '#1E1208' }} />
          </button>
        </div>
      </header>

      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
