import { HttpException } from "@nubie/framework";

export default class UserNotFoundException extends HttpException {
    public constructor() {
        super("User not exists", 404);
    }
}
