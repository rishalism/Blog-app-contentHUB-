import jwt, { JwtPayload } from 'jsonwebtoken'
import { Next, Req, Res } from '../types/RouteTypes';
import { httpStatus } from '../types/HttpStatusTypes';




const UserAuth = async (req: Req, res: Res, next: Next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            next();
        } else {
            res.status(httpStatus.UNAUTHORIZED).json('UNAUTHORIZED ACCESS');
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(httpStatus.UNAUTHORIZED).json('Token has expired');
        } else {
            next(error);
        }
    }
}

export default UserAuth