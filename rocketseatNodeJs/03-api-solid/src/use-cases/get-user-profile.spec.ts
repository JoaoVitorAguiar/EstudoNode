import { expect, describe, it } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemomyUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { beforeEach } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

let userRepository: InMemomyUserRepository
let sut: GetUserProfileUseCase

describe('Get user profile Use Case', () => { // os testes dentro do describe são agrupados
    beforeEach(() => {
        userRepository = new InMemomyUserRepository()
        sut = new GetUserProfileUseCase(userRepository)
    })

    it('Should be able to get user profile', async () => {
        const name = 'João Authenticate teste'
        const email = 'authenticate@test.com'
        const password = '123456'
        const salt = 6

        // Repositório por que não se pode utilzar outro caso de uso
        const cretedUser = await userRepository.create({
            name,
            email,
            password_hash: await hash(password, salt)
        })

        const { user } = await sut.execute({
            userId: cretedUser.id
        })


        expect(user.name).toEqual(name)
    })

    it('Should be not be able to get user profile with wrong id', async () => {
        const name = 'João Authenticate teste'
        const email = 'authenticate@test.com'
        const password = '123456'
        const salt = 6

        await expect(
            sut.execute({
                userId: 'non-existing-id' // wrong id
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})