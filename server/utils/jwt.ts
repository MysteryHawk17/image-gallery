import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { AuthPayload } from '../dto/user.dto';
import { JWT_SECRET } from '../config';
export const ValidateSignature  = async(req: Request) => {

    const signature = req.get('Authorization');
    const sec=JWT_SECRET;
    if(sec==undefined){
        throw new Error("JWT_SECRET is not defined");
    }
    if(signature){
        try {
            const payload = await jwt.verify(signature.split(' ')[1], sec) as AuthPayload; 
            req.user = payload;
            return true;

        } catch(err){
            return false
        } 
    }
    return false
};