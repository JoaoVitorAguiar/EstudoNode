import { registerUseCase } from "@/use-cases/register"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function register(request: FastifyRequest, replay: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(6),
        email: z.string().email(),
        password: z.string().min(6),

    })
    const { name, email, password } = registerBodySchema.parse(request.body) // "Parse()" lança um erro, ja o parseSafe() não

    try {
        await registerUseCase({ name, email, password })
    } catch (error) {
        return replay.status(409).send()
    }

    return replay.status(201).send()
}