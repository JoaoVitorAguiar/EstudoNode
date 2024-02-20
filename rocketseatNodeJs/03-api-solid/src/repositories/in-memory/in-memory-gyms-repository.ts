import { Decimal } from "@prisma/client/runtime/library";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class InMemomyGymsRepository implements GymsRepository {
    public gyms: Gym[] = []
    async searchMany(query: string, page: number) {
        return this.gyms
            .filter((g) => g.title.includes(query))
            .slice((page - 1) * 20, page * 20)
    }
    async findManyNearby(params: FindManyNearbyParams) {
        return this.gyms.filter((item) => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: params.latitude, longitude: params.longitude },
                {
                    latitude: item.latitude.toNumber(),
                    longitude: item.longitude.toNumber(),
                },
            )

            return distance < 10
        })
    }
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
    async findById(id: string) {
        const gym = this.gyms.find(g => g.id === id)
        if (!gym) return null
        return gym
    }

}