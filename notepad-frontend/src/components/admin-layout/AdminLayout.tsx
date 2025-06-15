import type { PropsWithChildren } from 'react'
import { Header } from './header/Header'

export default function AdminLayout({ children }: PropsWithChildren<unknown>) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}
