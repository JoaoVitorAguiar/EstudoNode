import { CheckIn } from "@prisma/client";
import { Prisma } from '@prisma/client'

export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    countByUserId(userId: string): Promise<number>
}
// CheckInUncheckedCreateInput tem campos que permite a criação de checkin com o usuário e gym já criados