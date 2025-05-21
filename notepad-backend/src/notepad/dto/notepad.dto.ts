import { IsOptional, IsString } from "class-validator";

export class NotepadDto {
    @IsString()
    @IsOptional()
    name: string
    
    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    createdAt?: string
}