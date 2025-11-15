import { IsEmail, IsString, MinLength } from "class-validator";

export default class UserCreateRequestDto {
    @IsString()
    public fullName!: string;

    @IsString()
    @IsEmail()
    public email!: string;

    @IsString()
    @MinLength(5)
    public password!: string;
}
