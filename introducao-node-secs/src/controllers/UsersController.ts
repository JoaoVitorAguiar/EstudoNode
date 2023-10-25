import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {prisma} from "../lib/prisma"
import { AppError } from "../errors/AppError";

export class UsersController  {
    public async list(_request : Request, response : Response) {
        const users = await prisma.user.findMany();

        return response.status(200).json(users)
    }

    public async show(request : Request, response : Response) {
        const { id } = request.params;

        const user = await prisma.user.findUnique({
            where: {id}
        })

        if(!user) throw new AppError('User not found', 404);     

        return response.status(200).json(user);
    }

    public async create(request: Request, response: Response){
        const {name, email} = request.body;
        const user = await prisma.user.create({
            data: {
                name,
                email,
            },
        });
        return response.status(200).json(user);
    }

    public async update(request: Request, response: Response){
        const {id} =  request.params;
        const {name, email} = request.body;

        const userExists = await prisma.user.findUnique({
            where: {id}
        })

        if(!userExists) throw new AppError('User not found', 404); 

        const user = await prisma.user.update({
            where: {id},
            data: {
                name,
                email,
            },
        });
        return response.status(200).json(user);
    }

    public async delete(request : Request, response : Response) {
        const { id } = request.params;

        const user = await prisma.user.findUnique({
            where: {id}
        })

        if(!user) throw new AppError('User not found', 404); 

        await prisma.user.delete({
            where: {id}
        })

        return response.status(200).json(user);
    }
}