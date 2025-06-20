import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Блокнот',
  description: 'Приложения для создания блокнотов'
}

export default function HomePage() {
  return (
    <h1>Notepads</h1>
  )
}
