import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Heading } from '@/components/ui/Heading'

export const metadata: Metadata = {
    title: 'Настройки профиля',
    ...NO_INDEX_PAGE
}

export default function Page() {
    return (
        <Heading title='Настройки профиля' />
    )
}
