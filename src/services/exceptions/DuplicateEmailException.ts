import { HttpException } from "@nubie/framework";

export default class DuplicateEmailException extends HttpException {
    public constructor() {
        super("User already exist with this email", 409);
    }
}
