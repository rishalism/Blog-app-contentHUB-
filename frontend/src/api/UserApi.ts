import Api from "../axios/AxiosConfig";
import { User_EndPoints } from "../endpoints/UserEndpoints";
import { IUser } from "../interface/UserInterface";
import errorHandler from "../middleware/ErrorHandler";


export async function UserLogin(userDetails: IUser) {
    try {
        const response = await Api.post(User_EndPoints.LOGIN, userDetails)
        return response
    } catch (error) {
        errorHandler(error)
    }
}



export async function UserSignup(userDetails: IUser) {
    try {
        const response = await Api.post(User_EndPoints.SIGNUP, userDetails)
        return response
    } catch (error) {
        errorHandler(error)
    }
}

export async function refreshAccesToken() {
    try {
        const response = await Api.post(User_EndPoints.SIGNUP)
        return response
    } catch (error) {
        errorHandler(error)
    }
}

export async function CreateBlog(Post: object) {
    try {
        const response = await Api.post(User_EndPoints.CREATE_BLOG, Post)
        return response
    } catch (error) {
        errorHandler(error)
    }
}

export async function UpdateBlog(Post: object) {
    try {
        const response = await Api.put(User_EndPoints.UPDATE_BLOG, Post)
        return response
    } catch (error) {
        errorHandler(error)
    }
}

export async function GetBLOG() {
    try {
        const response = await Api.get(User_EndPoints.GET_BLOG)
        return response
    } catch (error) {
        errorHandler(error)
    }
}

export async function DeleteBLOG(id: string) {
    try {
        const response = await Api.delete(`${User_EndPoints.DELETE_BLOG}/${id}`)
        return response
    } catch (error) {
        errorHandler(error)
    }
}

