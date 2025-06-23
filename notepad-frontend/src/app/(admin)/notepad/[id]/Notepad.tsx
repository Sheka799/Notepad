'use client'

import RichTextEditor from "@/components/rich-text-editor"
import { Button } from "@/components/ui/buttons/Button"
import Loader from "@/components/ui/Loader"
import { useNotepad } from "@/hooks/useNotepad"
import Link from "next/link"

interface IId {
    id: string
}

export function Notepad({id}: IId) {
    const {data, isLoading} = useNotepad(id)
    
    return (
        <>
            {isLoading ? 
                <Loader /> : 
                <div className="p-4">
                    <Link href={`/edit/${id}`}><Button>Редактировать</Button></Link>
                    <h1 className="text-center text-5xl mb-5">{data?.data.name}</h1>
                    <div><RichTextEditor content={data?.data.description || ""} editable={false} /></div>
                </div>
            }
        </>
    )
}
