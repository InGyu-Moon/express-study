import { Request, Response, NextFunction } from 'express';
import { TokenPayload, CustomRequest } from '../types/types';

import jwt from 'jsonwebtoken'


const userDataValidator = (req:Request, res:Response, next:NextFunction) => {
    const { userEmail, password, nickname } = req.body;
    if (!userEmail || !password || !nickname) {
        return res.status(400).json({ message: '입력 데이터가 올바르지 않습니다. 모든 필드를 포함해야 합니다.' });
    }
    next();
};

const verifyToken = (req:CustomRequest,res:Response, next:NextFunction)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(400).json({message:'토큰이 존재하지 않습니다.'});
    }
    jwt.verify(token, 'secret', function(err:Error, decode:TokenPayload) {
        if(err){
            console.log(err);
            return res.status(400).json({message:'토큰 오류'});
        }
        req.decode = decode;
        next();
    });
}

export {userDataValidator, verifyToken};