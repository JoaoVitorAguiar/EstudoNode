import { CheckIn } from "@prisma/client";
import { Prisma } from '@prisma/client'

export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findByUserIsOnDate(userId: string, date: Date): Promise<CheckIn | null>
}

// CheckInUncheckedCreateInput tem campos que permite a criação de checkin com o usuário e gym já criados