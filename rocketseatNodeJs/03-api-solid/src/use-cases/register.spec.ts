import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemomyUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'
import { beforeEach } from 'vitest'

let userRepository: InMemomyUserRepository
let sut: RegisterUseCase

describe('Register Use Case', () => { // os testes dentro do describe são agrupados
    beforeEach(() => {
        userRepository = new InMemomyUserRepository()
        sut = new RegisterUseCase(userRepository)
    })

    it('Should be able to register', async () => {
        const { user } = await sut.execute({
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
        const { user } = await sut.execute({
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
        const email = 'joao@test.com'

        await sut.execute({
            name: 'João Vitor',
            email: email,
            password: '123456'
        })

        await expect(
            // Espero que quando essa promise acabar ela rejeite e o resultado dela seja uma onstância da classe UserAlreadyExistsError
            sut.execute({
                name: 'Vitor',
                email: email,
                password: '896543'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})