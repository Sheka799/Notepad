import { userService } from "@/services/user.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useDeleteAvatar() {
    const queryClient = useQueryClient()
    
    const {mutate: deleteAvatar, isPending: isPendingDeleteAvatar} = useMutation({
        mutationKey: ['delete avatar'],
        mutationFn: () => userService.deleteAvatar(),
        onSuccess() {
            toast.success('Аватар удален')
            queryClient.invalidateQueries({queryKey: ['profile']})
        },
        onError(e) {
            toast.error('Не удалось удалить аватар')
            console.log(e);            
        }
    })

    return {deleteAvatar, isPendingDeleteAvatar}
}