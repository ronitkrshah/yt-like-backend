import { IUser } from "../../db-models";

export interface IUserRepository {
    createUser(
        fullName: string,
        email: string,
        passwordHash: string,
    ): Promise<void>;

    findUser(userId: string): Promise<IUser | null>;

    findUserByEmail(email: string): Promise<IUser | null>;
}
