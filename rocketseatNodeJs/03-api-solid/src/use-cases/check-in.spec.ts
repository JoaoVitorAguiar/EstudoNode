import { expect, describe, it } from 'vitest'
import { beforeEach } from 'vitest'
import { InMemomyCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemomyCheckInsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => { // os testes dentro do describe são agrupados
    beforeEach(() => {
        checkInRepository = new InMemomyCheckInsRepository()
        sut = new CheckInUseCase(checkInRepository)
    })

    it('Should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })


})