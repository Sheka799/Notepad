'use client'

import { useRef } from 'react'

interface UseSubmitGuardOptions {
	resetOnSuccess?: boolean
}

export function useSubmitGuard<T extends (...args: any[]) => Promise<void> | void>(
	fn: T,
	options: UseSubmitGuardOptions = {}
): T {
	const isSubmittingRef = useRef(false)

	const guarded = (async (...args: Parameters<T>) => {
		if (isSubmittingRef.current) return
		isSubmittingRef.current = true

		try {
			await fn(...args)

			if (options.resetOnSuccess) {
				isSubmittingRef.current = false
			}
		} catch (error) {
			isSubmittingRef.current = false
			throw error
		}
	}) as T

	return guarded
}
