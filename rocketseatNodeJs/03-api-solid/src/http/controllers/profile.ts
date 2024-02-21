import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {


    await request.jwtVerify() // Já gera um erro caso o jst Bearer não tenha sido enviado no header

    console.log(request.user.sub)


    return reply.status(200).send()
}