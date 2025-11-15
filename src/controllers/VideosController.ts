import {
    Authorize,
    Body,
    BodyValidation,
    File,
    FileUpload,
    Headers,
    HttpGet,
    HttpPost,
    Inject,
    JwtToken,
    RestController,
    RouteParam,
} from "@nubie/framework";
import { UploadVideoRequestDto } from "../dtos/video";
import { IUserService, IVideoService } from "../services/interfaces";

@RestController()
export default class VideosController {
    private readonly _videoService: IVideoService;
    private readonly _userService: IUserService;

    public constructor(
        @Inject("IVideoService") videoService: IVideoService,
        @Inject("IUserService") userService: IUserService
    ) {
        this._videoService = videoService;
        this._userService = userService;
    }

    /** Get all videos */
    @HttpGet("all")
    public async getAllVideos() {
        return await this._videoService.getAll();
    }

    /** Upload */
    @HttpPost("upload")
    @Authorize()
    @BodyValidation(UploadVideoRequestDto)
    @FileUpload({ field: "video" })
    public async uploadVideo(
        @Body() videoDetails: UploadVideoRequestDto,
        @File() video: Express.Multer.File,
        @Headers() header: Record<string, string>
    ) {
        const auth = header.authorization;
        const token = JwtToken.decodeToken(
            auth.replace("Bearer ", "")
        ) as any as Record<string, string>;
        const user = await this._userService.getUserByEmail(token.email);
        return await this._videoService.saveVideo(video, videoDetails, user);
    }

    @HttpGet("find/:videoId")
    public async findById(@RouteParam("videoId") videoId: string) {
        return await this._videoService.getById(videoId);
    }
}
