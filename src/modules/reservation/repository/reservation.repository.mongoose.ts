import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DocumentStatusType } from "@common/enums";
import { IReservation } from "../entities/definitions/reservation.interface";
import { Reservation } from "../entities/reservation.entity";
import { ReservationRepository } from "./definitions/reservation.repository.abstract";

@Injectable()
export class ReservationRepositoryMongo extends ReservationRepository {
    constructor(
        @InjectModel(Reservation.name) private model: Model<Reservation>
    ) {
        super();
    }
    async create(data: IReservation, session: any): Promise<IReservation[]> {
        let reservation: IReservation[] = await this.model.create([data], { session })
        return reservation;
    }

    async update(id: string, data: IReservation, session: any): Promise<IReservation> {
        let reservation: IReservation = await this.model.findByIdAndUpdate(
            id,
            {
                $set: data
            },
            {
                session: session,
                new: true
            }
        )
        return reservation;
    }

    async findAll(start_date: Date, end_date: Date): Promise<IReservation[]> {
        let reservations: IReservation[] = await this.model.find(
            {
                date: { $gte: start_date, $lte: end_date },
                document_status: DocumentStatusType.Active
            },
            {
                document_status: 0, __v: 0
            }
        )
        return reservations;
    }

    async findByNationalId(national_id: string): Promise<IReservation> {
        let reservation: IReservation = await this.model.findOne(
            {
                national_id: national_id
            },
            {
                document_status: 0, __v: 0
            }
        )
        return reservation;
    }

    async findOne(id: string): Promise<IReservation> {
        let reservation: IReservation = await this.model.findById(id)
        return reservation;
    }

    async remove(id: string, session: any): Promise<void> {
        await this.model.deleteOne({
            _id: id
        },{
            session
        });
    }

}