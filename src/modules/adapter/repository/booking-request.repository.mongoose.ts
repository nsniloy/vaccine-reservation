import { BookingRequestRepository } from "./definitions/booking-request.repository.abstract"
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BookingRequest, BookingRequestDocument } from "../entities/booking-request.entity";
import { IBookingPayload } from "@modules/adapter/entities/definitions/booking-request.interface";

@Injectable()
export class BookingRequestRepositoryMongo extends BookingRequestRepository {
    constructor(
        @InjectModel(BookingRequest.name) private model: Model<BookingRequestDocument>
    ) {
        super();
    }

    async findByRequestId(request_id: string): Promise<IBookingPayload> {
        let booking: BookingRequestDocument = await this.model.findOne({request_id: request_id})
        return <IBookingPayload>booking?.toJSON();
    }

    async create(booking_info: IBookingPayload): Promise<IBookingPayload> {
        let booking: BookingRequestDocument = await this.model.create(booking_info)
        return <IBookingPayload>booking?.toJSON();
    }

    async updateResponse(_id: string, booking_response: any): Promise<IBookingPayload> {
        let booking: BookingRequestDocument = await this.model.findByIdAndUpdate(
            _id,
            {
                $set: {
                    response: booking_response
                }
            }
        )
        return <IBookingPayload>booking?.toJSON();
    }

}