import { Inject, Injectable, Singleton } from "@nubie/framework";
import { User, Video } from "../entities";
import { IVideoService } from "./interfaces";
import { IUserRepository, IVideoRepository } from "../repositories/interfaces";
import { VideoNotFoundException } from "./exceptions";
import { UploadVideoRequestDto } from "../dtos/video";

@Injectable()
@Singleton("IVideoService")
export default class VideoServiceImpl implements IVideoService {
    private readonly _videoRepo: IVideoRepository;
    private readonly _userRepo: IUserRepository;

    public constructor(
        @Inject("IVideoRepository") videoRepo: IVideoRepository,
        @Inject("IUserRepository") userRepo: IUserRepository,
    ) {
        this._videoRepo = videoRepo;
        this._userRepo = userRepo;
    }

    public async getAll(): Promise<Video[]> {
        const videos = await this._videoRepo.getAllVideos();
        return videos.map(
            (video) =>
                new Video({
                    id: video._id.toString(),
                    title: video.title,
                    description: video.description,
                    url: video.url,
                    uploadedBy: video.uploadedBy.toString(),
                    uploadedOn: video.createdAt.toISOString(),
                }),
        );
    }

    public async getById(id: string): Promise<Video> {
        const video = await this._videoRepo.getVideoById(id);
        if (!video) throw new VideoNotFoundException();
        return new Video({
            id: video._id.toString(),
            title: video.title,
            description: video.description,
            url: video.url,
            uploadedBy: video.uploadedBy.toString(),
            uploadedOn: video.createdAt.toISOString(),
        });
    }

    public async saveVideo(
        video: Express.Multer.File,
        videoInfo: UploadVideoRequestDto,
        uploader: User,
    ): Promise<Video> {
        const uploadedId = await this._videoRepo.saveVideo(
            videoInfo.title,
            videoInfo.description ?? null,
            `http://localhost:3000/${video.filename}`, // will be s3 bucket or other url
            uploader.id,
        );
        return this.getById(uploadedId);
    }
}
