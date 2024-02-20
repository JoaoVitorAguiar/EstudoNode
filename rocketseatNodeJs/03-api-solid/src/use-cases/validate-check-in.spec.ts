import { InMemomyCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

let checkInsRepository: InMemomyCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemomyCheckInsRepository()
        sut = new ValidateCheckInUseCase(checkInsRepository)

        // vi.useFakeTimers()
    })

    afterEach(() => {
        // vi.useRealTimers()
    })

    it('should be able to validate the check-in', async () => {
        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id,
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInsRepository.checkIns[0].validated_at).toEqual(expect.any(Date))
    })

    it('should not be able to validate an inexistent check-in', async () => {
        await expect(() =>
            sut.execute({
                checkInId: 'inexistent-check-in-id',
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})