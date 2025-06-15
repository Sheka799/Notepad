import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Heading } from '@/components/ui/Heading'
import { Settings } from './Settings'

export const metadata: Metadata = {
    title: 'Настройки профиля',
    ...NO_INDEX_PAGE
}

export default function Page() {
    return (
        <div>
            <Heading title='Настройки профиля' />
            <Settings />
        </div>
    )
}
