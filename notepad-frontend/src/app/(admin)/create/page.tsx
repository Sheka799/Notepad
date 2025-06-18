import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Heading } from '@/components/ui/Heading'
import { Create } from './Create'

export const metadata: Metadata = {
    title: 'Создание блокнота',
    ...NO_INDEX_PAGE
}

export default function CreatePage() {
    return (
        <div>
            <Heading title="Создать блокнот" />
            <Create />
        </div>
    )
}
