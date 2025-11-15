import { HttpException } from "@nubie/framework";

export default class VideoNotFoundException extends HttpException {
    public constructor() {
        super("Video not available or it's been deleted", 404);
    }
}
