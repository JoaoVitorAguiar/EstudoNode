import { Gym } from "@prisma/client";
import { Prisma } from '@prisma/client'

export interface GymsRepository {
    findById(id: string): Promise<Gym | null>
}

// CheckInUncheckedCreateInput tem campos que permite a criação de checkin com o usuário e gym já criados