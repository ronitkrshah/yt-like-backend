import { Singleton } from "@nubie/framework";
import { IVideo, VideoSchema } from "../db-models";
import { IVideoRepository } from "./interfaces";

@Singleton("IVideoRepository")
export default class VideoRepositoryImpl implements IVideoRepository {
    public async getVideoById(videoId: string): Promise<IVideo | null> {
        return await VideoSchema.findById(videoId);
    }

    public async saveVideo(
        title: string,
        description: string | null,
        url: string,
        uploadedBy: string,
    ): Promise<string> {
        const video = await VideoSchema.insertOne({
            title,
            description,
            url,
            uploadedBy,
        });

        return video._id.toString();
    }

    public async getAllVideos(): Promise<IVideo[]> {
        return await VideoSchema.find();
    }
}
