export interface INotepadResponse {
    id: string
    createdAt?: string
    updatedAt?: string
    name: string
    description?: string
}

export type TypeNotepadFormState = Partial<Omit<INotepadResponse, 'id' | 'updatedAt'>>