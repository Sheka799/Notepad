export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

let accessToken: string | null = null

export const getAccessToken = () => accessToken

export const saveTokenStorage = (token: string) => {
	accessToken = token
}

export const removeFromStorage = () => {
	accessToken = null
}
