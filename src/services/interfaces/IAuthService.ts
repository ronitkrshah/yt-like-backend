export interface IAuthService {
    signIn(
        email: string,
        password: string,
    ): Promise<{ accessToken: string; refreshToken: string }>;
}
