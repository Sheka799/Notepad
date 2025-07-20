'use client'

import { LogOut } from "lucide-react"
import { LogoutModal } from "../ui/modal/LogoutModal"
import { useState } from "react"

export function LogoutButton() {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <div className='flex items-center opacity-40 hover:opacity-100 transition-opacity duration-300'>
                <button onClick={() => {setOpen(true)}}><LogOut size={20} /></button>
            </div>
            <LogoutModal open={open} setOpen={setOpen} />
        </>
    )
}
