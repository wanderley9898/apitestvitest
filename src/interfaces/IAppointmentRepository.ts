import { Appointment } from "../entities/appointment";

export default interface IAppointmentRepository {
  create(appointment: Appointment): Promise<void>
  findOverlappingAppointments(startsAt: Date, endsAt: Date): Promise<Appointment | null>

}