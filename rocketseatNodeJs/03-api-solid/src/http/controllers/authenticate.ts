import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { AuthenticateUseCase } from "@/use-cases/authenticate"
import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credentials-error"

export async function authenticate(request: FastifyRequest, replay: FastifyReply) {
    const autenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),

    })
    const { email, password } = autenticateBodySchema.parse(request.body) // "Parse()" lança um erro, ja o parseSafe() não

    try {
        const prismaUserRepository = new PrismaUserRepository()
        const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository);
        await authenticateUseCase.execute({ email, password })
    } catch (error) {
        if (error instanceof InvalidCredentialsError) return replay.status(400).send({
            message: error.message
        })
        throw error
    }

    return replay.status(200).send()
}