
import AdminLayout from '@/components/admin-layout/AdminLayout'
import type { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return <AdminLayout>{children}</AdminLayout>
}
