import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function register(request: FastifyRequest, replay: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(6),
        email: z.string().email(),
        password: z.string().min(6),

    })
    const { name, email, password } = registerBodySchema.parse(request.body) // "Parse()" lança um erro, ja o parseSafe() não

    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (userWithSameEmail) return replay.status(409).send() // 409 => conflito / dados duplicados

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash
        }
    })

    return replay.status(201).send()
}