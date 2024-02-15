import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemomyUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'

describe('Register Use Case', () => { // os testes dentro do describe são agrupados
    it('Should be able to register', async () => {
        const userRepository = new InMemomyUserRepository()
        const registerUseCase = new RegisterUseCase(userRepository)

        const { user } = await registerUseCase.execute({
            name: 'João',
            email: 'joao@test.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(user.id).toEqual(expect.any(String))
    })


    it('Should hash user password upon registration', async () => {
        const userRepository = new InMemomyUserRepository()
        const registerUseCase = new RegisterUseCase(userRepository)

        const { user } = await registerUseCase.execute({
            name: 'João',
            email: 'joao@test.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })


    it('Should be not be able to register with same email twice', async () => {
        const userRepository = new InMemomyUserRepository()
        const registerUseCase = new RegisterUseCase(userRepository)

        const email = 'joao@test.com'

        await registerUseCase.execute({
            name: 'João Vitor',
            email: email,
            password: '123456'
        })


        expect(
            // Espero que quando essa promise acabar ela rejeite e o resultado dela seja uma onstância da classe UserAlreadyExistsError
            registerUseCase.execute({
                name: 'Vitor',
                email: email,
                password: '896543'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})