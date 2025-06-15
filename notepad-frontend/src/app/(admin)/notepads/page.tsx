import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Heading } from '@/components/ui/Heading'

export const metadata: Metadata = {
    title: 'Блокноты',
    ...NO_INDEX_PAGE
}

export default function NotepadsPage() {
    return (
        <Heading title='Блокноты' />
    )
}
