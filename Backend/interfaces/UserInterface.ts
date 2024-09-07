import { IPost } from "./PostInterface";

export interface IUser {
    _id?: string,
    name: string,
    email: string,
    password: string,
    avatar: string
    post?: [string]
}