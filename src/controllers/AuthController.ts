import {
    Body,
    BodyValidation,
    HttpPost,
    HttpResponse,
    Inject,
    RestController,
} from "@nubie/framework";
import { IAuthService, IUserService } from "../services/interfaces";
import { SignInRequestDto } from "../dtos/auth";

@RestController()
export default class AuthController {
    private readonly _userService: IUserService;
    private readonly _authService: IAuthService;

    public constructor(
        @Inject("IUserService") userService: IUserService,
        @Inject("IAuthService") authService: IAuthService,
    ) {
        this._userService = userService;
        this._authService = authService;
    }

    @HttpPost("signIn")
    @BodyValidation(SignInRequestDto)
    public async signIn(@Body() creds: SignInRequestDto) {
        const tokens = await this._authService.signIn(
            creds.email,
            creds.password,
        );
        const user = await this._userService.getUserByEmail(creds.email);

        return HttpResponse.Ok({ ...user, ...tokens });
    }
}
