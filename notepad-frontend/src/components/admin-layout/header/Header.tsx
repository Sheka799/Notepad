import Link from "next/link";
import { Profile } from "./profile/Profile";

export function Header() {
    return (
        <header className="flex items-center justify-between flex-wrap p-4 gap-3">
            <div className="flex">
                <div className="-m-1.5 p-1.5">
                    <img
                        alt="logo"
                        src="/logo.png"
                        className="h-12 w-auto"
                    />
                </div>
            </div>
            <nav className="ml-auto">
                <Link href='/notepads' className="inline-flex items-center rounded-md bg-primary px-2 py-1 text-sm font-medium text-white ring-1 ring-blue-700/10 ring-inset">Блокноты</Link>
            </nav>
            <Profile />
        </header>
    )
}
