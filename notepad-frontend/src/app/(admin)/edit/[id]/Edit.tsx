'use client'

import { Button } from "@/components/ui/buttons/Button"
import { Field } from "@/components/ui/fields/Field"
import { INotepadResponse } from "@/types/notepad.types"
import { SubmitHandler, useForm } from "react-hook-form"
import { useInitialNotepad } from "./useInitialNotepad"
import { useRouter } from "next/navigation"
import RichTextEditor from "@/components/rich-text-editor"
import { useEffect, useState } from "react"
import Loader from "@/components/ui/Loader"
import { useUpdateNotepad } from "@/hooks/useUpdateNotepad"

interface IId {
    id: string
}

export function Edit({id}: IId) {

    const {push} = useRouter()
    
    const {register, handleSubmit, reset, setValue} = useForm<INotepadResponse>({
        mode: 'onSubmit'
    })

    const {data, isSuccess} = useInitialNotepad(reset, id)      

    const [content, setContent] = useState<string>("")       

    const {updateNotepad, isPending} = useUpdateNotepad()

    useEffect(() => {
        if (isSuccess) {
            setContent(data?.data.description) 
        }                
    }, [isSuccess])

    useEffect(() => {
        if (isSuccess) {
            setValue("description", content)  
        }                
    }, [content])

    const onSubmit: SubmitHandler<INotepadResponse> = data => {
        updateNotepad({id, data})
        reset()
        push(`/notepad/${id}`)
    }

    return (
        <div className="p-4">
            {
                !isSuccess ? <Loader /> : <form
                className='flex flex-col gap-5 w-full'
                onSubmit={handleSubmit(onSubmit)}
            >
                <Field
                    id='name'
                    label='Имя: '
                    placeholder='Введите имя: '
                    {...register('name')}
                    extra='mb-4'
                />
                <div>
                    <label htmlFor="content" className="text-sm dark:text-white ml-1.5 font-medium">Описание</label>
                    <RichTextEditor content={data?.data.description || content} onChange={setContent} />
                </div>

                <input type="hidden" {...register('description')} />

                <div className="flex gap-4 justify-center">
                    <Button
                        type='submit'
                        disabled={isPending}
                    >
                        Сохранить
                </Button>
                </div>
            </form>
            }
            
        </div>
    )
}
