import { notepadService } from "@/services/notepad.service"
import { INotepadResponse } from "@/types/notepad.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useUpdateNotepad() {
    const queryClient = useQueryClient()

    const {mutateAsync: updateNotepad, isPending} = useMutation({
        mutationKey: ['update notepad'],
        mutationFn: ({id, data}: {id: string, data: INotepadResponse}) => notepadService.updateNotepad(id, data),
        onSuccess() {
            toast.success('Данные блокнота обновлены!')
            queryClient.invalidateQueries({queryKey: ['notepad']})
        }
    })

    return {updateNotepad, isPending}
}