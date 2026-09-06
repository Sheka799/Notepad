import { authService } from "@/services/auth.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useDeleteAccount() {
    const queryClient = useQueryClient()
    const { push } = useRouter()

    const { mutate: deleteAccount, isPending: isPendingDeleteAccount } = useMutation({
        mutationKey: ['delete account'],
        mutationFn: (password: string) => authService.deleteAccount(password),
        onSuccess() {
            toast.success('Аккаунт удалён')
            queryClient.clear()
            push('/')
        },
        onError(e) {
            toast.error('Не удалось удалить аккаунт. Проверьте пароль')
            console.log(e);
        }
    })

    return { deleteAccount, isPendingDeleteAccount }
}
