import { IsOptional, IsString } from "class-validator";

export default class UploadVideoRequestDto {
    @IsString()
    public title!: string;

    @IsString()
    @IsOptional()
    public description?: string;
}
