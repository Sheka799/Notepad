import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Edit } from './Edit'
import { Heading } from '@/components/ui/Heading'

type Props = {
    params: Promise<{id: string}>
}

export const metadata: Metadata = {
    title: 'Редактирование блокнота',
    ...NO_INDEX_PAGE
}

export default async function EditPage({params}: Props) {
    const Id = (await params).id

    return (
        <>
            <Heading title="Редактирование блокнота" />
            <Edit id={Id} />
        </>
    )
}
