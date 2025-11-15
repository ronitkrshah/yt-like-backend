import { Scoped } from "@nubie/framework";
import { IUser, UserSchema } from "../db-models";
import { IUserRepository } from "./interfaces";

@Scoped("IUserRepository")
export default class UserRepositoryImpl implements IUserRepository {
    public async createUser(
        fullName: string,
        email: string,
        passwordHash: string
    ): Promise<void> {
        await UserSchema.insertOne({ fullName, email, password: passwordHash });
    }

    public async findUser(userId: string): Promise<IUser | null> {
        return await UserSchema.findById(userId);
    }

    public async findUserByEmail(email: string): Promise<IUser | null> {
        return await UserSchema.findOne({ email });
    }
}
