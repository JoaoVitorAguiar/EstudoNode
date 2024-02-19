import { UserRepository } from "@/repositories/user-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";

// DTOs
interface GetUserProfileUseCaseRequest {
    userId: string // uníca informação após o usuário se autenticar
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(
        private userRepository: UserRepository
    ) { }

    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.userRepository.findById(userId)
        if (!user)
            throw new ResourceNotFoundError() // Erro genérico pois dificilmente será ativado este erro


        return {
            user
        }
    }
}