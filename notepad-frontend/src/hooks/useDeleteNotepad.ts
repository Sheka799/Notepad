import { notepadService } from "@/services/notepad.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useDeleteNotepad() {
    const queryClient = useQueryClient()

    const {mutate: deleteNotepad, isPending} = useMutation({
        mutationKey: ['delete notepad'],
        mutationFn: (id: string) => notepadService.deleteNotepad(id),
        onSuccess() {
            toast.success('Блокнот удален!')
            queryClient.invalidateQueries({queryKey: ['notepads']})
        }
    })

    return {deleteNotepad, isPending}
}