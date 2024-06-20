import { IsEmail } from "class-validator";
import { LoginDto } from "./login.dto";

export class RegistrationDto extends LoginDto{
    @IsEmail()
    email: string
}