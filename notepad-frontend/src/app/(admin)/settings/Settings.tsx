'use client'

import { TypeUserForm } from "@/types/auth.types"
import { SubmitHandler, useForm } from "react-hook-form"
import { useInitialData } from "./useInitialData"
import { Field } from "@/components/ui/fields/Field"
import { Button } from "@/components/ui/buttons/Button"
import { useUpdateSettings } from "@/hooks/useUpdateSettings"
import { useUpdateAvatar } from "@/hooks/useUpdateAvatar"
import { ChangeEvent } from "react"
import { useDeleteAvatar } from "@/hooks/useDeleteAvatar"
import { useProfile } from "@/hooks/useProfile"
import Loader from "@/components/ui/Loader"
import { Trash } from "lucide-react"

export function Settings() {
	const {data, isLoading} = useProfile()
	
    const {register, handleSubmit, reset} = useForm<TypeUserForm>({
        mode: 'onChange'
    })

    useInitialData(reset)

    const {isPending, mutate} = useUpdateSettings()

	const {deleteAvatar} = useDeleteAvatar()

	const {uploadAvatar, isPendingAvatar} = useUpdateAvatar()

    const onSubmit: SubmitHandler<TypeUserForm> = data => {
        const {password, ...rest} = data

        mutate({
            ...rest,
            password: password || undefined
        })
    }

    const onSubmitAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files

		if (selectedFile) {
			const fileArray = Array.from(selectedFile)

			const formData = new FormData()
			formData.append('avatar', fileArray[0])			
			
			uploadAvatar(formData)
		}
		
    }

    return (
        <div className="p-4">
			<form className='w-full max-w-md mb-4'>
				<div className="col-span-full">
					<label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">Изображение профиля</label>
					<div className="mt-2">
						{isLoading ? (
							<Loader />
						) : (
							<div className="flex items-center gap-4">
								<div className='w-16 h-16 flex justify-center items-center text-2xl rounded-full uppercase bg-gray-200'>
								{data?.user.avatar ? <img src={`http://localhost:3001/static/${data?.user.avatar}`} width={64} height={64} className="w-16 h-16 rounded-full" alt="avatar" /> : data?.user.name?.charAt(0) || 'A'}
								</div>
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-3">
										<label
											htmlFor="file-upload"
											className="relative cursor-pointer rounded-xl bg-gray-200 font-semibold px-2 py-1 text-sm/6 text-gray-600"
										>
											<span>Обновить изображение профиля</span>
											<input id="file-upload" name="avatar" onChange={onSubmitAvatar} type="file" className="sr-only" />
										</label>
										<Trash onClick={() => deleteAvatar()} className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity duration-300" size={20} />
									</div>
									<p className="text-xs text-gray-400">PNG, JPG, GIF, JPEG, WEBP не более 5MB</p>
								</div>
							</div>
						)}
					</div>
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
		</div>
    )
}
