import { notepadService } from "@/services/notepad.service"
import { useQuery } from "@tanstack/react-query"

export function useNotepads() {
    const {data, isLoading} = useQuery({
        queryKey: ['notepads'],
        queryFn: () => notepadService.getNotepads()
    })

    return {data, isLoading}
}