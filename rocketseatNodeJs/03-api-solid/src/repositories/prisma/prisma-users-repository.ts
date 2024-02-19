import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UserRepository } from "../user-repository";

export class PrismaUserRepository implements UserRepository {
    async findById(userId: string) {
        const userWithSameId = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return userWithSameId
    }
    async findByEmail(email: string) {
        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return userWithSameEmail
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        })

        return user;
    }

}