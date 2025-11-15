import {
    Assembly,
    ClassResolver,
    HttpException,
    Nubie,
} from "@nubie/framework";
import "dotenv/config";
import mongoose from "mongoose";

class UnhandledException extends HttpException {
    public constructor(message?: string) {
        super(message ?? "Internal Server Error", 500);
    }
}

async function main() {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);
    console.log("Database Connected!");

    /** Registering Repositories */
    const repos = await Assembly.scanFilesAsync("Impl", "repositories");
    repos.forEach((it) => ClassResolver.resolve(it));

    /** Registering Repositories */
    const services = await Assembly.scanFilesAsync("Impl", "services");
    services.forEach((it) => ClassResolver.resolve(it));

    const builder = Nubie.createApp();

    /** Peacefully handling errors */
    builder.useGlobalErrorHandler((err, req, res, next) => {
        if (err instanceof HttpException) {
            return res.status(err.statusCode).json(err.toJSON());
        }

        const exception = new UnhandledException(err.message);
        return res.status(exception.statusCode).json(exception.toJSON());
    });

    builder.runAsync();
}

main();
