'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'cookieConsent'

export function CookieConsent() {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		try {
			if (!localStorage.getItem(STORAGE_KEY)) {
				setVisible(true)
			}
		} catch {}
	}, [])

	const accept = () => {
		try {
			localStorage.setItem(STORAGE_KEY, 'accepted')
		} catch {}
		setVisible(false)
	}

	if (!visible) return null

	return (
		<div className="fixed inset-x-4 bottom-4 z-50 sm:left-auto sm:right-4 sm:inset-x-auto sm:max-w-md">
			<div className="flex flex-col sm:flex-row items-center gap-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl px-5 py-4">
				<p className="text-sm text-gray-700 dark:text-gray-300">
					Мы используем файлы cookie и&nbsp;сервисы аналитики, чтобы сделать сайт удобнее. Подробнее — в{' '}
					<Link href="/privacy-policy" className="text-indigo-600 hover:text-indigo-500 underline">
						Политике
					</Link>
				</p>
				<button
					onClick={accept}
					className="shrink-0 w-full sm:w-auto rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition"
				>
					Принять
				</button>
			</div>
		</div>
	)
}
