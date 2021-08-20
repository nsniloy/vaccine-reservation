import { IBookingPayload } from "@modules/adapter/entities/definitions/booking-request.interface";

export abstract class BookingRequestRepository {
    abstract create(booking_info: IBookingPayload): Promise<IBookingPayload>;
    abstract updateResponse(_id: string, booking_info: any): Promise<IBookingPayload>;
    abstract findByRequestId(request_id: string): Promise<IBookingPayload>;
}