import {
    Body,
    BodyValidation,
    HttpGet,
    HttpPost,
    HttpResponse,
    Inject,
    QueryMode,
    QueryParam,
    RestController,
    RouteParam,
} from "@nubie/framework";
import { UserCreateRequestDto } from "../dtos/user";
import { IUserService } from "../services/interfaces";

@RestController()
export default class UsersController {
    private readonly _userService: IUserService;

    public constructor(@Inject("IUserService") userService: IUserService) {
        this._userService = userService;
    }

    /** Register a new user */
    @HttpPost("create")
    @BodyValidation(UserCreateRequestDto)
    public async createUser(@Body() user: UserCreateRequestDto) {
        const newUser = await this._userService.createUser(user);
        return HttpResponse.Created(newUser);
    }

    /** Find User By Id */
    @HttpGet("find")
    public async findUserById(
        @QueryParam("userId", QueryMode.Optional) userId: string,
        @QueryParam("email", QueryMode.Optional) email: string,
    ) {
        if (!userId && !email) throw new Error("Missing query parameteres");

        if (userId) {
            const user = await this._userService.getUserById(userId);
            return HttpResponse.Ok(user);
        } else {
            const user = await this._userService.getUserByEmail(email);
            return HttpResponse.Ok(user);
        }
    }
}
