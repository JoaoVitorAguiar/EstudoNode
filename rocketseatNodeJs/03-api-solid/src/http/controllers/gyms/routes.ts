import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../../middlewares/verify-jwt'

export async function gymRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)
}

