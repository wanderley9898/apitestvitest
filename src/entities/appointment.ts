import { IAppointment } from "../interfaces/IAppointment"

export class Appointment {
 

  get customer(): string {
    return this.appointment.customer
  }

  set customer(customer: string) {
    this.appointment.customer = customer
  }

  get startsAt() {
    return this.appointment.startsAt
  }

  set startsAt(startsAt: Date) {
    this.appointment.startsAt = startsAt
  }

  set endsAt(endsAt: Date) {
    this.appointment.endsAt = endsAt
  }

  get endsAt() {
    return this.appointment.endsAt
  }

  constructor(
    private appointment: IAppointment
  ) {
    const { startsAt, endsAt } = appointment

    if (startsAt <= new Date()) {
      throw new Error('StartsAt must be in the future')
    }
    
    if(endsAt <= startsAt) {
      throw new Error('EndsAt must be after startsAt')
    }
    this.appointment = appointment
  }
}