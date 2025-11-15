import { HttpException } from "@nubie/framework";

export default class InvalidCredentialsException extends HttpException {
    public constructor() {
        super("Provided credentials are invalid", 400);
    }
}
