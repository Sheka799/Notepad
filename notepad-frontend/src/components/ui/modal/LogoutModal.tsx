'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import cn from 'clsx'
import { authService } from "@/services/auth.service"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

interface IModal {
    open: boolean
    setOpen: any
}

export function LogoutModal({open, setOpen}: IModal) {
    const {push} = useRouter()
    const {mutate, isPending} = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => authService.logout(),
        onSuccess: () => push('/')
    })
    
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"/>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                        <div className="bg-white dark:bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-white">Вы действительно хотите выйти из личного кабинета?</DialogTitle>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                            type="button"
                            disabled={isPending}
                            onClick={() => mutate()}
                            className={cn(
                                "inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto",
                                isPending ? "cursor-not-allowed bg-gray-400 dark:bg-gray-600" : "bg-red-600 hover:bg-red-500"
                            )}>
                            Да
                            </button>
                            <button
                            type="button"
                            data-autofocus
                            disabled={isPending}
                            onClick={() => setOpen(false)}
                            className={cn(
                                "mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-1 ring-gray-300 dark:ring-gray-700 ring-inset sm:mt-0 sm:w-auto",
                                isPending ? "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500" : "bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                            )}>
                            Нет
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
