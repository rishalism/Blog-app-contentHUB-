import mongoose, { Document, Model, Schema } from "mongoose";
import { IPost } from "../interfaces/PostInterface";


const PostSchema = new Schema<IPost & Document>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

export const postModal: Model<IPost & Document> = mongoose.model<IPost & Document>('Posts', PostSchema)