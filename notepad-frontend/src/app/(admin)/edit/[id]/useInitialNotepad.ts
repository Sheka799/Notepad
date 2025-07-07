import { useNotepad } from "@/hooks/useNotepad";
import { INotepadResponse } from "@/types/notepad.types";
import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";

export function useInitialNotepad(reset: UseFormReset<INotepadResponse>, id: string) {
    const {data, isSuccess} = useNotepad(id)

    useEffect(() => {
        if (isSuccess && data) {
            reset({
                name: data.name,
                description: data.description
            })
        }
    }, [isSuccess])

    return {data, isSuccess}
}