import { notepadService } from "@/services/notepad.service"
import { TypeNotepadFormState } from "@/types/notepad.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useCreateNotepad() {
    const queryClient = useQueryClient()

    const {mutateAsync: createNotepad, isPending} = useMutation({
        mutationKey: ['create notepad'],
        mutationFn: (data: TypeNotepadFormState) => notepadService.createNotepad(data),
        onSuccess() {
            toast.success('Создан новый блокнот!')
            queryClient.invalidateQueries({queryKey: ['notepads']})
        },
    })

    return {createNotepad, isPending}
}