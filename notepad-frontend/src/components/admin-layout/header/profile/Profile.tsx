'use client'

import Loader from "@/components/ui/Loader"
import { useProfile } from "@/hooks/useProfile"
import { LogoutButton } from "../../LogoutButton"
import { SettingsButton } from "../../SettingsButton"

export function Profile() {
    const {data, isLoading} = useProfile()

    return (
        <div className=''>
			{isLoading ? (
				<Loader />
			) : (
				<div className='flex items-center'>
					<div className='text-right mr-3'>
						<p className='font-bold -mb-1'>{data?.user.name}</p>
						<p className='text-sm opacity-40'>{data?.user.email}</p>
					</div>

					<div className='w-10 h-10 flex justify-center items-center text-2xl rounded uppercase'>
						{data?.user.name?.charAt(0) || 'A'}
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
