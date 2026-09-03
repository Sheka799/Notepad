'use client'

import RichTextEditor from "@/components/rich-text-editor"
import { Button } from "@/components/ui/buttons/Button"
import { Field } from "@/components/ui/fields/Field"
import { useCreateNotepad } from "@/hooks/useCreateNotepad"
import { TypeNotepadFormState } from "@/types/notepad.types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

export function Create() {
    const [content, setContent] = useState<string>("");

    const {push} = useRouter()

    const {createNotepad} = useCreateNotepad()

    const {register, handleSubmit, reset, setValue} = useForm<TypeNotepadFormState>({
        mode: 'onSubmit',
    })

    useEffect(() => {
        setValue("description", content)
    },[content])

    const onSubmit: SubmitHandler<TypeNotepadFormState> = async (data) => {
        const notepad = await createNotepad(data)
        push(`/notepad/${notepad.id}`)
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

                <div className="mb-4">
                    <label htmlFor="content" className="text-sm dark:text-white ml-1.5 font-medium">Описание</label>
                    <RichTextEditor content={content} onChange={setContent} />
                </div>

                <input type="hidden" {...register('description')} />

                <div className="flex gap-4 justify-center">
                    <Button>Создать</Button>
                </div>
            </form>
        </div>
    )
}
