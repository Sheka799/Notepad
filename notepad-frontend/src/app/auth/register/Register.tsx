'use client'

import { Button } from "@/components/ui/buttons/Button"
import { Field } from "@/components/ui/fields/Field"
import { Heading } from "@/components/ui/Heading"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { authService } from "@/services/auth.service"
import { IAuthForm } from "@/types/auth.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Loader as LoaderIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSubmitGuard } from "@/hooks/useSubmitGuard"
import { toast } from "sonner"

export function Register() {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IAuthForm>({
        mode: 'onChange'
    })

    const [consent, setConsent] = useState(false)
    const [consentError, setConsentError] = useState(false)

    const {push} = useRouter()
    const queryClient = useQueryClient()

    const {mutateAsync, isPending} = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IAuthForm) => authService.main('register', data),
        onSuccess() {
            queryClient.clear()
            toast.success('Успешная регистрация!')
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

    const submitRegistration = useSubmitGuard(async (data: IAuthForm) => {
        await mutateAsync(data)
    })

    const onSubmit: SubmitHandler<IAuthForm> = data => {
        if (!consent) {
            setConsentError(true)
            return
        }

        setConsentError(false)
        submitRegistration(data)
    }

    return (
        <div className="flex min-h-screen">
            <form className="w-full max-w-screen-sm m-auto shadow rounded-xl p-layout p-4" onSubmit={handleSubmit(onSubmit)}>
                <Heading title="Регистрация" />

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
                    autoComplete="new-password"
                />

                <label className="flex items-start gap-2 mb-4 text-sm text-gray-600 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={consent}
                        onChange={e => {
                            setConsent(e.target.checked)
                            if (e.target.checked) setConsentError(false)
                        }}
                        className="mt-0.5"
                    />
                    <span>
                        Согласен с{' '}
                        <Link href="/privacy-policy" target="_blank" className="text-indigo-600 hover:text-indigo-500 underline">
                            политикой обработки персональных данных
                        </Link>
                    </span>
                </label>
                {consentError && (
                    <span className="text-xs text-red-600 block mb-4">
                        Нужно согласие на обработку персональных данных для регистрации
                    </span>
                )}

                <div className="flex gap-4 justify-center">
                    <Button disabled={isPending} className="flex justify-center w-[230px]">
                        {isPending ? <LoaderIcon className="animate-spin h-5 w-5" /> : 'Зарегистрироваться'}
                    </Button>
                </div>

                <p className="mt-4 text-sm text-center text-gray-600">
                    Уже есть аккаунт?{' '}
                    <Link href="/auth" className="text-indigo-600 hover:text-indigo-500 underline">
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    )
}
