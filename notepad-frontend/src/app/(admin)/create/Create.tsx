'use client'

import { Button } from "@/components/ui/buttons/Button"
import { Field } from "@/components/ui/fields/Field"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { useCreateNotepad } from "@/hooks/useCreateNotepad"
import { TypeNotepadFormState } from "@/types/notepad.types"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

export function Create() {
    const {push} = useRouter()

    const {createNotepad} = useCreateNotepad()

    const {register, handleSubmit, reset} = useForm<TypeNotepadFormState>({
        mode: 'onSubmit'
    })

    const onSubmit: SubmitHandler<TypeNotepadFormState> = data => {
        createNotepad(data)
        reset()
        push(DASHBOARD_PAGES.NOTEPADS)
    }

    return (
        <div className="p-4">
            <form className="mb-7" onSubmit={handleSubmit(onSubmit)}>
                <Field 
                    {...register('name', {
                        required: 'Пустое поле'
                    })}
                    id="name"
                    label="Название"
                    placeholder="Введите название"
                    extra="mb-4"
                    type="name"
                />

                <Field 
                    {...register('description')}
                    id="description"
                    label="Текст"
                    placeholder="Введите текст"
                    extra="mb-6"
                    type="text"
                />

                <div className="flex gap-4 justify-center">
                    <Button>Создать</Button>
                </div>
            </form>
        </div>
    )
}
