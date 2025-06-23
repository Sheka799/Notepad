import { axiosWithAuth } from "@/api/interceptors"
import { INotepadResponse, TypeNotepadFormState } from "@/types/notepad.types"

class NotepadService {
    private BASE_URL = 'user/notepads'

    async getNotepads() {
        const response = await axiosWithAuth.get<INotepadResponse[]>(this.BASE_URL)
        return response
    }

    async getNotepad(id: string) {
        const response = await axiosWithAuth.get(`${this.BASE_URL}/${id}`)
        return response
    }

    async createNotepad(data: TypeNotepadFormState) {
        const response = await axiosWithAuth.post(this.BASE_URL, data)
        return response
    }

    async updateNotepad(id: string, data: TypeNotepadFormState) {
        const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
        return response
    }

    async deleteNotepad(id: string) {
        const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
        return response
    }
}

export const notepadService = new NotepadService()