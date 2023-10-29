import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export function ensureAuthenticate( 
    request : Request, 
    response : Response, 
    next: NextFunction
){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        return response.status(401).json({
            message: 'Token required'
        })
    ;}
    const [_, token] = authHeader.split(' ');
    try{
        const {sub} = verify(token, 'minhaChaveMuitoSecreta');
        request.userId = sub as string;
        next();
    } catch(error){
        throw new AppError('Token invalid', 401);
    }
}