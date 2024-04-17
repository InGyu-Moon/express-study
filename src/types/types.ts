import { Request } from 'express';

export interface TokenPayload {
    userEmail: string;
    nickname: string;
    loginTime:string;
}
export interface CustomRequest extends Request {
    decode?: TokenPayload;
}
