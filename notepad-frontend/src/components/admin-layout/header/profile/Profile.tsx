'use client'

import Loader from "@/components/ui/Loader"
import { useProfile } from "@/hooks/useProfile"
import { LogoutButton } from "@/components/admin-layout/LogoutButton"
import { SettingsButton } from "@/components/admin-layout/SettingsButton"

export function Profile() {
    const {data, isLoading} = useProfile()

    return (
        <div className='ml-auto sm:ml-0'>
			{isLoading ? (
				<Loader />
			) : (
				<div className='flex items-center'>
					<div className='text-right mr-3'>
						<p className='font-bold -mb-1'>{data?.user.name}</p>
						<p className='text-sm opacity-40'>{data?.user.email}</p>
					</div>

					<div className='w-12 h-12 flex justify-center items-center text-2xl rounded-full uppercase bg-gray-200'>
						{data?.user.avatar ? <img src={`http://localhost:3001/static/${data?.user.avatar}`} width={48} height={48} className="w-12 h-12 rounded-full" alt="avatar" /> : data?.user.name?.charAt(0) || 'A'}
					</div>

					<div className="flex flex-col gap-1 ml-3">
						<SettingsButton />	
						<LogoutButton />
					</div>
				</div>
			)}
		</div>
    )
}
