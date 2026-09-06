'use client'

import { Button } from "@/components/ui/buttons/Button"
import { Field } from "@/components/ui/fields/Field"
import { Heading } from "@/components/ui/Heading"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { authService } from "@/services/auth.service"
import { IAuthForm } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Loader as LoaderIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSubmitGuard } from "@/hooks/useSubmitGuard"
import { toast } from "sonner"

export function Auth() {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IAuthForm>({
        mode: 'onChange'
    })

    const {push} = useRouter()

    const {mutateAsync, isPending} = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IAuthForm) => authService.main('login', data),
        onSuccess() {
            toast.success('Успешный вход в систему!')
            reset()
            push(DASHBOARD_PAGES.NOTEPADS)
        },
        onError(error: unknown) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data?.message)
            } else {
                console.log(error);
            }
        }
    })

    const onSubmit: SubmitHandler<IAuthForm> = useSubmitGuard(async data => {
        await mutateAsync(data)
    })

    return (
        <div className="flex min-h-screen">
            <form className="w-full max-w-screen-sm m-auto shadow rounded-xl p-layout p-4" onSubmit={handleSubmit(onSubmit)}>
                <Heading title="Вход" />

                {errors.email?.message && <span className="text-xs text-red-600">{errors.email?.message}</span>}
                <Field
                    {...register('email', {
                        required: 'Введите email',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Введите валидный email"
                        }
                    })}
                    id="email"
                    label="Email"
                    placeholder="Введите email"
                    extra="mb-4"
                    type="email"
                    autoComplete="email"
                />

                {errors.password?.message && <span className="text-xs text-red-600">{errors.password?.message}</span>}
                <Field
                    {...register('password', {
                        required: 'Введите пароль',
                        minLength: {
                            value: 6,
                            message: "Пароль должен состоять минимум из 6 символов",
                        },
                    })}
                    id="password"
                    label="Пароль"
                    placeholder="Введите пароль"
                    extra="mb-6"
                    type="password"
                    autoComplete="current-password"
                />

                <div className="flex gap-4 justify-center">
                    <Button disabled={isPending}>
                        {isPending ? <LoaderIcon className="animate-spin h-5 w-5" /> : 'Войти'}
                    </Button>
                </div>

                <p className="mt-4 text-sm text-center text-gray-600">
                    Нет аккаунта?{' '}
                    <Link href="/auth/register" className="text-indigo-600 hover:text-indigo-500 underline">
                        Зарегистрироваться
                    </Link>
                </p>
            </form>
        </div>
    )
}
