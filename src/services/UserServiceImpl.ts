import { Inject, Injectable, Scoped } from "@nubie/framework";
import { UserCreateRequestDto } from "../dtos/user";
import { User } from "../entities";
import { IUserRepository } from "../repositories/interfaces";
import { IUserService } from "./interfaces";
import { DuplicateEmailException, UserNotFoundException } from "./exceptions";
import bcrypt from "bcrypt";
import { IUser } from "../db-models";

@Injectable()
@Scoped("IUserService")
export default class UserServiceImpl implements IUserService {
    private readonly _userRepo: IUserRepository;

    public constructor(@Inject("IUserRepository") userRepo: IUserRepository) {
        this._userRepo = userRepo;
    }

    public async createUser(user: UserCreateRequestDto): Promise<User> {
        const existingUser = await this._userRepo.findUserByEmail(user.email);
        if (existingUser) throw new DuplicateEmailException();

        const hashedPassword = await bcrypt.hash(user.password, 10);

        await this._userRepo.createUser(
            user.fullName,
            user.email,
            hashedPassword,
        );
        const newUser = (await this._userRepo.findUserByEmail(
            user.email,
        )) as IUser;
        return new User(
            newUser._id.toString(),
            newUser.fullName,
            newUser.email,
        );
    }

    public async getUserById(userId: string): Promise<User> {
        const user = await this._userRepo.findUser(userId);
        if (!user) throw new UserNotFoundException();
        return new User(user._id.toString(), user.fullName, user.email);
    }

    public async getUserByEmail(email: string): Promise<User> {
        const user = await this._userRepo.findUserByEmail(email);
        if (!user) throw new UserNotFoundException();
        return new User(user._id.toString(), user.fullName, user.email);
    }
}
