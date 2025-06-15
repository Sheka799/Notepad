import { Settings } from "lucide-react";
import Link from "next/link";

export function SettingsButton() {
    return (
        <div className='flex items-center opacity-40 hover:opacity-100 transition-opacity duration-300'>
            <Link href="/settings"><Settings size={20} /></Link>
        </div>
    )
}
