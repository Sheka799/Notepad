'use client'

import { Button } from "@/components/ui/buttons/Button"
import { Field } from "@/components/ui/fields/Field"
import { Heading } from "@/components/ui/Heading"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { authService } from "@/services/auth.service"
import { IAuthForm } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

export function Auth() {
    const {register, handleSubmit, reset} = useForm<IAuthForm>({
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
        }
    })

    const onSubmit: SubmitHandler<IAuthForm> = data => {
        mutate(data)
    }

    return (
        <div className="flex min-h-screen">
            <form className="w-1/4 m-auto shadow bg-sidebar rounded-xl p-layout p-4" onSubmit={handleSubmit(onSubmit)}>
                <Heading title="Авторизация" />

                <Field 
                    {...register('email', {
                        required: 'Неверный email'
                    })}
                    id="email"
                    label="Email"
                    placeholder="Введите email"
                    extra="mb-4"
                    type="email"
                />

                <Field 
                    {...register('password', {
                        required: 'Неверный пароль'
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
