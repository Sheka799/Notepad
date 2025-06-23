import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Notepad } from './Notepad'

type Props = {
    params: Promise<{id: string}>
}

export const metadata: Metadata = {
    title: 'Блокнот',
    ...NO_INDEX_PAGE
}

export default async function NotepadPage({params}: Props) {
    const Id = (await params).id
    
    return (
        <Notepad id={Id} />
    )
}
