import { ACCES_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "../types/JwtTokenTypes";
import jwt, { JwtPayload } from 'jsonwebtoken'

export async function generateAccesToken(userId: string): Promise<string> {
    const jwtkey = process.env.ACCES_TOKEN_SECRET;
    if (!jwtkey) {
        throw new Error('Access token secret is not defined');
    }
    const payload = { userId };
    return jwt.sign(payload, jwtkey, { expiresIn: ACCES_TOKEN_MAX_AGE });
}

export async function generateRefreshToken(userId: string): Promise<string> {
    const jwtkey = process.env.REFRESH_TOKEN_SECRET;
    if (!jwtkey) {
        throw new Error('Refresh token secret is not defined');
    }
    const payload = { userId };
    return jwt.sign(payload, jwtkey, { expiresIn: REFRESH_TOKEN_MAX_AGE });
}


export async function createAccesTokenWithRefreshToken(token: string): Promise<string | null> {
    try {
        const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
        const accessToken = generateAccesToken(decode.userId);
        return accessToken;
    } catch (error) {
        console.error('Error verifying refresh token:', error);
        return null;
    }
}