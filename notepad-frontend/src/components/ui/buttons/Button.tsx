import cn from 'clsx'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
	children,
	className,
	...rest
}: PropsWithChildren<TypeButton>) {
	return (
		<button
			className={cn(
				'linear rounded-lg border border-primary py-2 px-7 text-base font-medium transition bg-primary text-white hover:bg-indigo-500 active:bg-brand-700',
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
