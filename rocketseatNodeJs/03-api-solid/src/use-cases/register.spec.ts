import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => { // os testes dentro do describe são agrupados
    it('Should hash user password upon rgistration', async () => {
        const registerUseCase = new RegisterUseCase({
            async findByEmail(email) {
                return null
            },
            async create(data) {
                return {
                    id: 'user-1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date(),
                }
            }
        })

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
})