import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { randomUUID } from "node:crypto";

export class InMemomyUserRepository implements UserRepository {
    public users: User[] = []

    async findById(userId: string) {
        const user = this.users.find(u => u.id == userId) // find no array retorna undenfined caso não encontre
        if (!user) return null
        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }
        this.users.push(user)
        return user
    }
    async findByEmail(email: string) {
        const user = this.users.find(u => u.email === email)

        if (!user) return null

        return user
    }

}