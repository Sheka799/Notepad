'use client'

import { INotepadResponse } from "@/types/notepad.types";
import { Button } from "@/components/ui/buttons/Button";
import Loader from "@/components/ui/Loader";
import Link from "next/link";
import { useNotepads } from "@/hooks/useNotepads";
import dayjs from 'dayjs'
import { Eye, Pencil, X } from "lucide-react";
import { useState } from "react";
import { DeleteNotepadModal } from "@/components/ui/modal/DeleteNotepadModal";

export function Notepads() {
    const [open, setOpen] = useState<boolean>(false)
    const [notepadId, setNotepadId] = useState<string>("")
    const {data, isLoading} = useNotepads()  

    return (       
        <div className="p-4">
            <div className="flex justify-center mb-10">
                <Link href="/create"><Button>Создать блокнот</Button></Link>
            </div>
            {isLoading ? 
            <Loader /> 
            : data?.length ? 
            <>
                <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none md:grid-cols-3 lg:grid-cols-5">
                    {data?.map((notepad: INotepadResponse) => 
                        <div key={notepad.id} className="flex items-start justify-between gap-4 border p-3 rounded-md">
                            <article key={notepad.id} className="flex max-w-xl flex-col items-start justify-between">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={notepad.createdAt} className="">{dayjs(`${notepad.createdAt}`).format('DD.MM.YYYY')}</time>
                                </div>
                                <div className="group relative mb-3">
                                    <h3 className="mt-3 text-lg/6 font-semibold">{notepad.name}</h3>
                                </div>
                                <div className="flex gap-4">
                                    <Link href={`/notepad/${notepad.id}`}><Eye size={25} className="opacity-40 hover:opacity-100 transition-opacity duration-300" /></Link>
                                    <Link href={`/edit/${notepad.id}`}><Pencil size={25} className="opacity-40 hover:opacity-100 transition-opacity duration-300" /></Link>
                                    <X onClick={() => { setOpen(true); setNotepadId(notepad.id)} } size={25} className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </article>
                        </div>
                    )}
                </div>
                <DeleteNotepadModal open={open} setOpen={setOpen} id={notepadId} />
            </>
            : <p>Блокноты не найдены!</p>}
        </div>
    )
}
