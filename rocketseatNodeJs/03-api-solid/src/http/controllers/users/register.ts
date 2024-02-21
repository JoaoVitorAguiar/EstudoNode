import { UserAlreadyExistsError } from "@/use-cases/erros/user-already-exists-error"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case"

export async function register(request: FastifyRequest, replay: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(6),
        email: z.string().email(),
        password: z.string().min(6),

    })
    const { name, email, password } = registerBodySchema.parse(request.body) // "Parse()" lança um erro, ja o parseSafe() não

    try {
        const registerUseCase = makeRegisterUseCase()
        await registerUseCase.execute({ name, email, password })
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) return replay.status(409).send({
            message: error.message
        })
        throw error
    }

    return replay.status(201).send()
}