import { Length } from "class-validator"

export class LoginDto {
    @Length(4, 50)
    login: string

    @Length(4, 100)
    password: string
}