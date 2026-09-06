import { IsString, MinLength } from "class-validator"

export class DeleteAccountDto {
    @MinLength(6, {
        message: 'Пароль должен состоять минимум из 6 символов'
    })
    @IsString()
    password: string
}
