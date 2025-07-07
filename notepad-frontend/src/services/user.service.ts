import { IUser, TypeUserForm } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'

export interface IProfileResponse {
	user: IUser
}

class UserService {
	private BASE_URL = '/user'

	async getProfile() {
		const response = await axiosWithAuth.get<IProfileResponse>(this.BASE_URL)
		return response.data
	}

	async update(data: TypeUserForm) {
		const response = await axiosWithAuth.put(this.BASE_URL, data)
		return response.data
	}

	async uploadAvatar(formData: FormData) {		
		const response = await axiosWithAuth.post(this.BASE_URL, formData)				
		return response.data
	}

	async deleteAvatar() {		
		const response = await axiosWithAuth.put(`${this.BASE_URL}/delete`)
        return response.data
	}
}

export const userService = new UserService()
