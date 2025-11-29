import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.scss";
import { SITE_NAME } from "@/constants/seo.constants";
import { Toaster } from "sonner";
import { Providers } from "./providers";

const zen = Roboto({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: ['normal']
})

export const metadata: Metadata = {
  title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Простое и удобное приложение для работы с текстовыми файлами. Он позволяет создавать, редактировать и сохранять заметки, код или другие текстовые данные без сложного форматирования',
	icons: {
		icon: [
		{ url: '/favicon/favicon.ico', sizes: 'any' },
		{ url: '/favicon/icon.png', type: 'image/png', sizes: '32x32' },
		{ url: '/favicon/icon.svg', type: 'image/svg+xml' },
		{ url: '/favicon/web-app-manifest-192x192', type: 'image/png', sizes: '192x192' },
		{ url: '/favicon/web-app-manifest-512x512', type: 'image/png', sizes: '512x512' },
		],
		apple: [
		{ url: '/favicon/apple-icon.png', type: 'image/png', sizes: '180x180' },
		],
  	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={zen.className}
      >
        <Providers>
					{children}
					<Toaster
						theme='dark'
						position='bottom-right'
						duration={1500}
					/>
				</Providers>
      </body>
    </html>
  );
}
