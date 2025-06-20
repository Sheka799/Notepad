import Link from "next/link";
import { Profile } from "./profile/Profile";
import { Button } from "@/components/ui/buttons/Button";

export function Header() {
    return (
        <header className="flex items-center justify-between h-16 p-4">
            <div>
                <Link href='/notepads'><Button>Блокноты</Button></Link>
            </div>
            <Profile />
        </header>
    )
}
