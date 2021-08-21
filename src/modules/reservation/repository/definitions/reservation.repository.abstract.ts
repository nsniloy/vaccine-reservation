import { IReservation } from "../../entities/definitions/reservation.interface";

export abstract class ReservationRepository {
    abstract create(data: IReservation, session?: any): Promise<IReservation[]>;
    abstract update(id: string, data: IReservation, session?: any): Promise<IReservation>;
    abstract remove(_id: string, session: any): Promise<void>;
    abstract findAll(start_date: Date, end_date: Date, centre_id: string): Promise<IReservation[]>;
    abstract findOne(id: string): Promise<IReservation>;
    abstract findByNationalId(nationa_id: string): Promise<IReservation>;
}