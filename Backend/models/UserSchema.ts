import mongoose, { Document, Model, Mongoose, Schema } from "mongoose";
import { IUser } from "../interfaces/UserInterface";


const UserSchema = new Schema<IUser & Document>(({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
    },
    post: [
        {
            type: Schema.Types.ObjectId, // Reference to Post model
            ref: "Posts",
            required: false,
        },
    ],
}))

export const UserModal: Model<IUser & Document> = mongoose.model<IUser & Document>('Users', UserSchema)