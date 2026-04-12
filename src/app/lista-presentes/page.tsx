import type { Metadata } from 'next'
import ListaPresentes from './ListaPresentes'

export const metadata: Metadata = { title: 'Lista de Presentes | Rafael & Flávia' }

export default function Page() {
  return <ListaPresentes />
}
