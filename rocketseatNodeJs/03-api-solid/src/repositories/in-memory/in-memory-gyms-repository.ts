import { Decimal } from "@prisma/client/runtime/library";
import { GymsRepository } from "../gyms-repository";
import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemomyGymsRepository implements GymsRepository {
    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            created_at: new Date()
        }
        this.gyms.push(gym)
        return gym

    }
    public gyms: Gym[] = []
    async findById(id: string) {
        const gym = this.gyms.find(g => g.id === id)
        if (!gym) return null
        return gym
    }

}