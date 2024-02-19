import { Decimal } from "@prisma/client/runtime/library";
import { GymsRepository } from "../gyms-repository";
import { Gym } from "@prisma/client";

export class InMemomyGymsRepository implements GymsRepository {
    public gyms: Gym[] = []
    async findById(id: string) {
        const gym = this.gyms.find(g => g.id === id)
        if (!gym) return null
        return gym
    }

}