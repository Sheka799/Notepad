import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
    title: 'Блокноты',
    ...NO_INDEX_PAGE
}

export default function NotepadsPage() {
    return <div>Блокноты</div>
}
