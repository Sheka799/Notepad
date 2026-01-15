import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Notepad - Приложение для создания и управления заметками',
  description: 'Полнофункциональное веб-приложение для создания, редактирования и управления заметками. С поддержкой расширенного текстового редактора, облачного хранилища и JWT аутентификацией'
}

export default function HomePage() {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <div className="-m-1.5 p-1.5">
              <img
                alt="logo"
                src="/logo.png"
                className="h-12 w-auto"
              />
            </div>
          </div>
          <div className="flex flex-1 justify-end">
            <Link href="/auth" className="text-sm/6 font-semibold text-gray-900">Войти <span aria-hidden="true">&rarr;</span></Link>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Блокнот
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Создавайте и&nbsp;управляйте заметками с&nbsp;расширенным текстовым редактором. Безопасная облачная синхронизация, интуитивный интерфейс и&nbsp;полный контроль над вашим контентом. Все ваши идеи защищены и&nbsp;синхронизируются на всех устройствах.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/auth" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Начать</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
