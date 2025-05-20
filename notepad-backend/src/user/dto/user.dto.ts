import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UserDto {
    @IsEmail()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    name?: string

    @IsOptional()
    @MinLength(6, {
        message: 'Пароль должен состоять минимум из 6 символов'
    })    
    @IsString()
    password?:string
}