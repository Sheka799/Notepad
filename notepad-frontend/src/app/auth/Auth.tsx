'use client'

import { Button } from "@/components/ui/buttons/Button"
import { Field } from "@/components/ui/fields/Field"
import { Heading } from "@/components/ui/Heading"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { authService } from "@/services/auth.service"
import { IAuthForm } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

export function Auth() {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IAuthForm>({
        mode: 'onChange'
    })

    const [isLoginForm, setIsLoginForm] = useState(false)

    const {push} = useRouter()

    const {mutate} = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IAuthForm) => authService.main(isLoginForm ? 'login' : 'register', data),
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

    const onSubmit: SubmitHandler<IAuthForm> = data => {
        mutate(data)
    }

    return (
        <div className="flex min-h-screen">
            <form className="min-w-72 max-w-screen-md m-auto shadow rounded-xl p-layout p-4" onSubmit={handleSubmit(onSubmit)}>
                <Heading title="Авторизация" />                

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
                />

                <div className="flex gap-4 justify-center">
                    <Button onClick={() => setIsLoginForm(false)}>Регистрация</Button>
                    <Button onClick={() => setIsLoginForm(true)}>Вход</Button>
                </div>
            </form>
        </div>
    )
}
