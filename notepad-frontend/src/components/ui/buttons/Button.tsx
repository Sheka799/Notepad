import cn from 'clsx'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
	children,
	className,
	disabled,
	...rest
}: PropsWithChildren<TypeButton>) {
	return (
		<button
			disabled={disabled}
			className={cn(
				'linear rounded-lg border py-2 px-7 text-base font-medium transition text-white active:bg-brand-700',
				disabled
					? 'cursor-not-allowed border-gray-400 bg-gray-400'
					: 'border-primary bg-primary hover:bg-indigo-500',
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
