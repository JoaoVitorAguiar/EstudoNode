import fastify from "fastify";
import { appRoutes } from "./http/routes/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) // Erro de validação
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() })


    if (env.NODE_ENV !== 'production')
        console.error(error)
    // else: TODO: deveria fazer o log em uma ferramenta externa DataLog/NewRelic/Sentry
    return reply.status(500).send({ message: 'Internal server error.' })
})