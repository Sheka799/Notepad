import Link from "next/link";
import { Profile } from "./profile/Profile";

export function Header() {
    return (
        <header className="flex items-center justify-between h-16 p-4">
            <div>
                <Link className="linear rounded-lg bg-transparent border border-primary py-2 px-7 text-base font-medium text-white transition hover:bg-primary active:bg-brand-700" href='/notepads'>Блокноты</Link>
            </div>
            <Profile />
        </header>
    )
}
