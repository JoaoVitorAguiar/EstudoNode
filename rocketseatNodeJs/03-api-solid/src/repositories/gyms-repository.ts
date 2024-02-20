import { Gym } from "@prisma/client";
import { Prisma } from '@prisma/client'

export interface GymsRepository {
    findById(id: string): Promise<Gym | null>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}
