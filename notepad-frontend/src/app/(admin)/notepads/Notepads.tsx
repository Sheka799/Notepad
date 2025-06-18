'use client'

import { INotepadResponse } from "@/types/notepad.types";
import { Button } from "@/components/ui/buttons/Button";
import Loader from "@/components/ui/Loader";
import Link from "next/link";
import { useNotepads } from "@/hooks/useNotepads";
import { useDeleteNotepad } from "@/hooks/useDeleteNotepad";
import dayjs from 'dayjs'

export function Notepads() {
    const {data, isLoading} = useNotepads()
    const {deleteNotepad} = useDeleteNotepad()    
    
    return (       
        <div className="p-4">
            <div className="flex justify-center mb-10">
                <Link href="/create"><Button>Создать блокнот</Button></Link>
            </div>
            {isLoading ? 
            <Loader /> 
            : data?.data.length ? 
            <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none md:grid-cols-3 lg:grid-cols-5">
                {data?.data.map((notepad: INotepadResponse) => 
                    <div key={notepad.id} className="flex items-start justify-between gap-4 border p-3 rounded-md">
                        <article key={notepad.id} className="flex max-w-xl flex-col items-start justify-between">
                            <div className="flex items-center gap-x-4 text-xs">
                                <time dateTime={notepad.createdAt} className="text-slate-300">{dayjs(`${notepad.createdAt}`).format('DD.MM.YYYY')}</time>
                            </div>
                            <div className="group relative mb-3">
                                <h3 className="mt-3 text-lg/6 font-semibold text-white group-hover:text-slate-200">{notepad.name}</h3>
                            </div>
                            <Button onClick={() => deleteNotepad(notepad.id)}>Удалить</Button>
                        </article>
                    </div>
                )}
            </div>
            : <p>Блокноты не найдены!</p>}
        </div>
    )
}
