import { CheckIn, Prisma, User } from "@prisma/client";
import { CheckInsRepository } from "../check-in-repository";
import { randomUUID } from "node:crypto";

export class InMemomyCheckInsRepository implements CheckInsRepository {
    public checkIns: CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date()
        }
        this.checkIns.push(checkIn)

        return checkIn
    }
}

