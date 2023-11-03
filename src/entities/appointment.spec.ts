import { expect, test } from 'vitest'
import { getFutureDate } from '../tests/utils/getFutureDate'
import { Appointment } from './appointment'

test('create appointment', () => {
  const startsAt = getFutureDate('2022-01-02')
  const endsAt = getFutureDate('2022-01-03')

  const appointment = new Appointment({
    customer: 'Wanderley',
    startsAt,
    endsAt
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual('Wanderley')
})

test('cannot create appointment with negative duration', () => {
  const startsAt = getFutureDate('2022-01-02')
  const endsAt = getFutureDate('2022-01-01')

  expect(() => {
    return new Appointment({
      customer: 'Wanderley',
      startsAt,
      endsAt
    })
  }).toThrow()
})

test('cannot create appointment with start date before now', () => {
  const startsAt = new Date()
  const endsAt = new Date()

  startsAt.setDate(startsAt.getDate() - 1)
  endsAt.setDate(endsAt.getDate() + 3)

  expect(() => {
    return new Appointment({
      customer: 'Wanderley',
      startsAt,
      endsAt
    })
  })
})