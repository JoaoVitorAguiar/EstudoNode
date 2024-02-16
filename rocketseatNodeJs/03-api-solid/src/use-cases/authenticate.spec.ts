import { expect, describe, it } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemomyUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

describe('Authenticate Use Case', () => { // os testes dentro do describe são agrupados
    it('Should be able to authenticate', async () => {
        const userRepository = new InMemomyUserRepository()
        const sut = new AuthenticateUseCase(userRepository)

        const name = 'João Authenticate teste'
        const email = 'authenticate@test.com'
        const password = '123456'
        const salt = 6

        // Repositório por que não se pode utilzar outro caso de uso
        await userRepository.create({
            name,
            email,
            password_hash: await hash(password, salt)
        })

        const { user } = await sut.execute({
            email,
            password
        })


        expect(user.id).toEqual(expect.any(String))
    })

    it('Should be not be able to authenticate with wrong email', async () => {
        const userRepository = new InMemomyUserRepository()
        const sut = new AuthenticateUseCase(userRepository)

        const name = 'João Authenticate teste'
        const email = 'authenticate@test.com'
        const password = '123456'
        const salt = 6

        await expect(
            sut.execute({
                email: 'authenticatewrong@test.com', // wrong email
                password
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('Should be not be able to authenticate with wrong password', async () => {
        const userRepository = new InMemomyUserRepository()
        const sut = new AuthenticateUseCase(userRepository)

        const name = 'João Authenticate teste'
        const email = 'authenticate@test.com'
        const password = '123456'
        const salt = 6

        // Repositório por que não se pode utilzar outro caso de uso
        await userRepository.create({
            name,
            email,
            password_hash: await hash(password, salt)
        })

        await expect(
            sut.execute({
                email,
                password: '1234567'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

})