import type { Metadata } from 'next'
import { Cormorant_Garamond, Lato } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rafael & Flávia | 17.05.2026',
  description: 'Celebrando o amor de Rafael & Flávia — 17 de maio de 2026, Chácara Lagos Italy, São José dos Pinhais - PR',
  icons: {
    icon: '/images/casal-lago.jpeg',
    apple: '/images/casal-lago.jpeg',
  },
  openGraph: {
    title: 'Rafael & Flávia | 17.05.2026',
    description: 'Celebrando o amor de Rafael & Flávia',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${lato.variable}`}>
      <body className="min-h-screen bg-cream flex flex-col">
        <Header />
        <main className="pt-14 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
