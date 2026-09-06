import { IAuthForm, IAuthResponse } from '@/types/auth.types'
import { axiosClassic } from '@/api/interceptors'
import { getAccessToken, removeFromStorage, saveTokenStorage } from './auth-token.service'

class AuthService {
	async main(type: 'login' | 'register', data: IAuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	}

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	}

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')

		if (response.data) removeFromStorage()

		return response
	}

	async deleteAccount(password: string) {
		const accessToken = getAccessToken()

		const response = await axiosClassic.delete<boolean>('/auth/account', {
			data: { password },
			headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined
		})

		if (response.data) removeFromStorage()

		return response
	}
}

export const authService = new AuthService()