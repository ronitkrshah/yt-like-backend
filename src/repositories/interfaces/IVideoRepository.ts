import { IVideo } from "../../db-models";

export interface IVideoRepository {
    saveVideo(
        title: string,
        description: string | null,
        url: string,
        uploadedBy: string,
    ): Promise<string>;

    getAllVideos(): Promise<IVideo[]>;

    getVideoById(videoId: string): Promise<IVideo | null>;
}
