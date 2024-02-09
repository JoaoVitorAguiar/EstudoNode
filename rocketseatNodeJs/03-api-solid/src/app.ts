import fastify from "fastify";
import { z } from 'zod';
import { prisma } from "@/lib/prisma";

export const app = fastify();

app.post('/users', async (request, replay) => {
    const registerBodySchema = z.object({
        name: z.string().min(6),
        email: z.string().email(),
        password: z.string().min(6),

    })
    const { name, email, password } = registerBodySchema.parse(request.body) // "Parse()" lança um erro, ja o parseSafe() não
    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: password
        }
    })

    return replay.status(201).send()
})
