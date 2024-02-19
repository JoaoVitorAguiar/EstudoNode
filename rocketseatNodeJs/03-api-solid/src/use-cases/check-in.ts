import { UserRepository } from "@/repositories/user-repository";
import { InvalidCredentialsError } from "./erros/invalid-credentials-error";
import { compare } from "bcryptjs";
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-in-repository";

// DTOs
interface CheckInUseCaseRequest {
    userId: string,
    gymId: string
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository
    ) { }

    async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId,
        })

        return {
            checkIn
        }
    }
}