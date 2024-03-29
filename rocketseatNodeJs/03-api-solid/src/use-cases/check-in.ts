import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-in-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxNumberOfCheckInsError } from "./erros/max-number-of-check-ins-error";
import { MaxDistanceError } from "./erros/max-distance-error";

// DTOs
interface CheckInUseCaseRequest {
    userId: string,
    gymId: string,
    userLatitude: number,
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository
    ) { }

    async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId)
        if (!gym) throw new ResourceNotFoundError()
        const distance = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            {
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber(),
            },
        )

        const MAX_DISTANCE_IN_KM = 0.1

        if (distance > MAX_DISTANCE_IN_KM) {
            throw new MaxDistanceError()
        }
        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date(),
        )
        if (checkInOnSameDay) {
            throw new MaxNumberOfCheckInsError()
        }

        // Calcular distancia e verificar se for menor que 100m

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId,
        })

        return {
            checkIn
        }
    }
}