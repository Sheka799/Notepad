'use client'

import { TypeUserForm } from "@/types/auth.types"
import { SubmitHandler, useForm } from "react-hook-form"
import { useInitialData } from "./useInitialData"
import { Field } from "@/components/ui/fields/Field"
import { Button } from "@/components/ui/buttons/Button"
import { useUpdateSettings } from "@/hooks/useUpdateSettings"
import { useUpdateAvatar } from "@/hooks/useUpdateAvatar"
import { ChangeEvent, useState } from "react"
import { useProfile } from "@/hooks/useProfile"
import Loader from "@/components/ui/Loader"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { DeleteAvatarModal } from "@/components/ui/modal/DeleteAvatarModal"

export function Settings() {
	const [open, setOpen] = useState<boolean>(false)
	
	// Функции по форме профиля 
    const {register, handleSubmit, reset} = useForm<TypeUserForm>({
        mode: 'onChange'
    })

    useInitialData(reset)

    const {isPending, mutate} = useUpdateSettings()

    const onSubmit: SubmitHandler<TypeUserForm> = data => {
        const {password, ...rest} = data

        mutate({
            ...rest,
            password: password || undefined
        })
    }

	// Функции по изображению профиля
	const {data, isLoading} = useProfile()

	const {uploadAvatar, isPendingAvatar} = useUpdateAvatar()

    const onSubmitAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files

		if (selectedFile) {
			const fileArray = Array.from(selectedFile)

			const formData = new FormData()
			formData.append('avatar', fileArray[0])	

			const avatar: object | any = formData.get('avatar')			
			
			if (avatar.type === "image/webp" || avatar.type === "image/png" || avatar.type === "image/jpg" || avatar.type === "image/gif" || avatar.type === "image/jpeg") {
				uploadAvatar(formData)
			} else {
				toast.error('Изображение должно быть формата PNG, JPG, GIF, JPEG, WEBP')
			}			
		}		
    }

    return (
        <div className="p-4">
			{
				isLoading ? (<Loader />) : (
					<>
						<form className='w-full max-w-md mb-4'>
							<div className="col-span-full">
								<label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Изображение профиля</label>
								{isPendingAvatar ? (<Loader />) : (
									<div className="mt-2">
									<div className="flex items-center gap-4">
										<div className='w-16 h-16 flex justify-center items-center text-2xl rounded-full uppercase bg-gray-200 dark:bg-gray-800'>
										{data?.user.avatarUrl ? <img src={`${data?.user.avatarUrl}`} width={64} height={64} className="w-16 h-16 rounded-full" alt="avatar" /> : data?.user.name?.charAt(0) || 'A'}
										</div>
										<div className="flex flex-col gap-2">
											<div className="flex items-center gap-3">
												<label
													htmlFor="file-upload"
													className="relative cursor-pointer rounded-xl bg-gray-200 font-semibold px-2 py-1 text-sm/6 text-gray-600"
												>
													<span>Обновить изображение профиля</span>
													<input id="file-upload" disabled={isPendingAvatar} name="avatar" onChange={onSubmitAvatar} type="file" className="sr-only" />
												</label>
												{data?.user.avatarUrl ? <Trash onClick={() => setOpen(true)} className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity duration-300" size={20} /> : ''}
											</div>
											<p className="text-xs text-gray-400">PNG, JPG, JPEG, WEBP не более 5MB</p>
										</div>
									</div>
								</div>
								)}
							</div>
						</form>
						<form
							className='w-full max-w-md'
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className='grid'>
								<div>
									<Field
										id='email'
										label='Email: '
										placeholder='Введите email: '
										type='email'
										{...register('email', {
											required: 'Email is required!'
										})}
										extra='mb-4'
									/>

									<Field
										id='name'
										label='Имя: '
										placeholder='Введите имя: '
										{...register('name')}
										extra='mb-4'
									/>

									<Field
										id='password'
										label='Пароль: '
										placeholder='Введите пароль: '
										type='password'
										{...register('password')}
										extra='mb-10'
									/>
								</div>
							</div>

							<Button
								type='submit'
								disabled={isPending}
							>
								Сохранить
							</Button>
						</form>
						<DeleteAvatarModal open={open} setOpen={setOpen} />
					</>
				)
			}			
		</div>
    )
}