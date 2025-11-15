import { IsEmail, IsString, MinLength } from "class-validator";

export default class SignInRequestDto {
    @IsString()
    @IsEmail()
    public email!: string;

    @IsString()
    @MinLength(6)
    public password!: string;
}
