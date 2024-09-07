import { IUser } from "../interfaces/UserInterface";
import { UserModal } from "../models/UserSchema";
import { createAccesTokenWithRefreshToken, generateAccesToken, generateRefreshToken } from "../services/JwtAuthentication";
import { httpStatus } from "../types/HttpStatusTypes";
import { REFRESH_TOKEN_MAX_AGE } from "../types/JwtTokenTypes";
import { Next, Req, Res } from "../types/RouteTypes";


export async function Signup(req: Req, res: Res, next: Next) {
    try {
        const { email, name, password, avatar }: IUser = req.body
        console.log(req.body);
        // check if email already exist in the database 
        const UserAlreadyExist = await UserModal.findOne({ email: email })
        console.log(UserAlreadyExist);
        if (!UserAlreadyExist) {
            const User = await new UserModal({ email, name, password, avatar })
            const Saved = await User.save()
            if (Saved) {
                res.status(httpStatus.OK).json('signup succefull')
            } else {
                res.status(httpStatus.CONFLICT).json('failed to Signup')
            }
        } else {
            res.status(httpStatus.CONFLICT).json('Email Already In Use . Try Different Email')
        }
    } catch (error) {
        next(error)
    }
}



export async function Login(req: Req, res: Res, next: Next) {
    try {
        const { email, password } = req.body
        // check if email already exist 
        console.log(req.body);
        const UserAlreadyExist = await UserModal.findOne({ email: email })
        if (UserAlreadyExist) {
            // check Password 
            if (UserAlreadyExist.password === password) {
                console.log('password is correct');
                const accessToken = await generateAccesToken(UserAlreadyExist._id)
                const refreshToken = await generateRefreshToken(UserAlreadyExist._id)
                if (refreshToken) {
                    res.cookie('refreshtoken', refreshToken, {
                        httpOnly: true,
                        maxAge: REFRESH_TOKEN_MAX_AGE,
                        secure: process.env.NODE_ENV !== "development",
                        sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
                    })
                }
                res.status(httpStatus.OK).json({ accessToken, UserData: UserAlreadyExist })
            } else {
                console.log('password is incorrect');

                res.status(httpStatus.CONFLICT).json('Invalid Password')
            }
        } else {
            res.status(httpStatus.CONFLICT).json('we cannot find an account with this email')
        }

    } catch (error) {
        next(error)
    }
}

export async function refreshAccesToken(req: Req, res: Res, next: Next) {
    try {
        const refreshToken = req.cookies.refreshtoken
        if (refreshToken) {
            const accestoken = await createAccesTokenWithRefreshToken(refreshToken);
            if (accestoken) {
                res.status(httpStatus.OK).json({ accestoken });
            } else {
                res.status(httpStatus.UNAUTHORIZED).json('Invalid refresh token');
            }
        } else {
            console.log('in case no refreshtoken');
            res.status(httpStatus.REQUEST_TIMEOUT).json('Refresh token not provided');
        }
    } catch (error) {
        next(error);
    }
}
