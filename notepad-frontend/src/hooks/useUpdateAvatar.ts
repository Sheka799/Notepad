import { userService } from "@/services/user.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

export function useUpdateAvatar() {
    const queryClient = useQueryClient()

    const {mutate: uploadAvatar, isPending: isPendingAvatar} = useMutation({
        mutationKey: ['upload avatar'],
        mutationFn: (formData: FormData) => userService.uploadAvatar(formData),
        onSuccess() {
            toast.success('Аватар изменен')
            queryClient.invalidateQueries({queryKey: ['profile']})
        },
        onError(error: unknown) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data?.message)                  
            } else {
                console.log(error);                  
            }
        }
    })

    return {uploadAvatar, isPendingAvatar}
}