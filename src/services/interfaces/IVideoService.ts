import { UploadVideoRequestDto } from "../../dtos/video";
import { User, Video } from "../../entities";

export interface IVideoService {
    getAll(): Promise<Video[]>;
    getById(id: string): Promise<Video>;
    saveVideo(
        video: Express.Multer.File,
        videoInfo: UploadVideoRequestDto,
        uploader: User,
    ): Promise<Video>;
}
