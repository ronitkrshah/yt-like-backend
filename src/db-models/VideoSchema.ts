import { Document, model, Schema, Types } from "mongoose";

export interface IVideo extends Document {
    _id: Types.ObjectId;
    title: string;
    description: string | null;
    url: string;
    uploadedBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const videoSchema = new Schema<IVideo>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: false,
            trim: true,
            default: null,
        },
        url: {
            type: String,
            required: true,
        },
        uploadedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const VideoSchema = model<IVideo>("Video", videoSchema);
export default VideoSchema;
