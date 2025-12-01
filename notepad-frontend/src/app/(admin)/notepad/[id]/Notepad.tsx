'use client'

import RichTextEditor from "@/components/rich-text-editor"
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
                    <Link href={`/edit/${id}`} className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-700 ring-1 ring-red-600/10 ring-inset mb-4">Редактировать</Link>
                    <h1 className="text-center text-5xl mb-5">{data?.name}</h1>
                    <div><RichTextEditor content={data?.description || ""} editable={false} /></div>
                </div>
            }
        </>
    )
}