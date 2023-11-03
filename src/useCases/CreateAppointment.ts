import { Appointment } from "../entities/appointment";
import IAppointmentRepository from "../interfaces/IAppointmentRepository";
import { ICreateAppointmentRequest } from "../interfaces/ICreateAppointmentRequest";
import { ICreateAppointmentResponse } from "../interfaces/ICreateAppointmentResponse";

export default class CreateAppointment {
  constructor(
    private appointmentRepository: IAppointmentRepository
  ) {
    
  }
  async execute({ customer, startsAt, endsAt }: ICreateAppointmentRequest): Promise<ICreateAppointmentResponse> {
    const overlappingAppointment = await this.appointmentRepository.findOverlappingAppointments(startsAt, endsAt)

    if(overlappingAppointment) {
      throw new Error('Another appointment overlaps this appointment')
    }

    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt
    })

    await this.appointmentRepository.create(appointment)

    return appointment
  }
}