'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

export function useTheme() {
	const [theme, setThemeState] = useState<Theme>('light')
	useEffect(() => {
		setThemeState(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
	}, [])

	const setTheme = (next: Theme) => {
		document.documentElement.classList.remove('light', 'dark')
		document.documentElement.classList.add(next)
		try {
			localStorage.setItem(STORAGE_KEY, next)
		} catch {}
		setThemeState(next)
	}

	const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

	return { theme, setTheme, toggleTheme }
}
