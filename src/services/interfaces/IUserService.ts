import { UserCreateRequestDto } from "../../dtos/user";
import { User } from "../../entities";

export interface IUserService {
    createUser(user: UserCreateRequestDto): Promise<User>;
    getUserById(userId: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
}
