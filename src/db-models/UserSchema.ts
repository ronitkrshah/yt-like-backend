import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    fullName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const UserSchema = model<IUser>("User", userSchema);

export default UserSchema;
