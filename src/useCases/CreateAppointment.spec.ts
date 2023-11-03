import { describe, expect, it } from 'vitest'
import { Appointment } from '../entities/appointment'
import InMemoriesAppointmentRepository from '../repositories/in-memory/InMemoriesAppointmentRepository'
import { getFutureDate } from '../tests/utils/getFutureDate'
import CreateAppointment from './CreateAppointment'

describe('CreateAppointment', () => {
  it('should be able to create an appointment', () => {
    const startsAt = getFutureDate('2022-01-02')
    const endsAt = getFutureDate('2022-01-03')

    const appointmentRepository = new InMemoriesAppointmentRepository()
    const createAppointment = new CreateAppointment(appointmentRepository)

    expect(createAppointment.execute({
      customer: 'Wanderley',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  })
})


it('should not be able to create an appointment with overlapping dates', async () => {
 
    const startsAt = getFutureDate('2022-01-02')
    const endsAt = getFutureDate('2022-01-05')

    const appointmentRepository = new InMemoriesAppointmentRepository()
    const createAppointment = new CreateAppointment(appointmentRepository)

    await createAppointment.execute({
      customer: 'Wanderley',
      startsAt,
      endsAt
    })

    expect(createAppointment.execute({
      customer: 'Wanderley',
      startsAt: getFutureDate('2022-01-04'),
      endsAt: getFutureDate('2022-01-06')
    })).rejects.toBeInstanceOf(Error)


    expect(createAppointment.execute({
      customer: 'Wanderley',
      startsAt: getFutureDate('2022-01-01'),
      endsAt: getFutureDate('2022-01-03')
    })).rejects.toBeInstanceOf(Error)


    expect(createAppointment.execute({
      customer: 'Wanderley',
      startsAt: getFutureDate('2022-01-01'),
      endsAt: getFutureDate('2022-01-06')
    })).rejects.toBeInstanceOf(Error)


    expect(createAppointment.execute({
      customer: 'Wanderley',
      startsAt: getFutureDate('2022-01-03'),
      endsAt: getFutureDate('2022-01-04')
    })).rejects.toBeInstanceOf(Error)

  })
