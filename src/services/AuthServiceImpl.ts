import { Inject, Injectable, JwtToken, Singleton } from "@nubie/framework";
import { IAuthService } from "./interfaces";
import { IUserRepository } from "../repositories/interfaces";
import {
    InvalidCredentialsException,
    UserNotFoundException,
} from "./exceptions";
import bcrypt from "bcrypt";
import moment from "moment";

@Injectable()
@Singleton("IAuthService")
export default class AuthServiceImpl implements IAuthService {
    private readonly _userRepo: IUserRepository;

    public constructor(@Inject("IUserRepository") userRepo: IUserRepository) {
        this._userRepo = userRepo;
    }

    public async signIn(
        email: string,
        password: string
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await this._userRepo.findUserByEmail(email);
        if (!user) throw new UserNotFoundException();

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) throw new InvalidCredentialsException();

        // generating tokens
        const accessToken = new JwtToken();
        accessToken.addClaim("iss", "ronitkrshah");
        accessToken.addClaim("email", user.email);
        accessToken.addClaim("sub", user.fullName);
        accessToken.addClaim(
            "exp",
            moment()
                .add(process.env.ACCESS_TOKEN_TIMEOUT_IN_MINUTES, "minute")
                .unix()
        );

        const refreshToken = new JwtToken();
        accessToken.addClaim("iss", "ronitkrshah");
        accessToken.addClaim("email", user.email);
        accessToken.addClaim("sub", user.fullName);
        accessToken.addClaim(
            "exp",
            moment()
                .add(process.env.REFRESH_TOKEN_TIMEOUT_IN_MINUTES, "minute")
                .unix()
        );

        return {
            accessToken: accessToken.generateToken(),
            refreshToken: refreshToken.generateToken(),
        };
    }
}
