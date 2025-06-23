import { notepadService } from "@/services/notepad.service"
import { useQuery } from "@tanstack/react-query"

export function useNotepad(id: string) {
    const {data, isLoading, isSuccess} = useQuery({
        queryKey: ['notepad', id],
        queryFn: () => notepadService.getNotepad(id)
    })

    return {data, isLoading, isSuccess}
}