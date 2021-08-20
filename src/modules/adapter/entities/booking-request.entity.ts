import { DocumentStatusType } from '@common/enums/status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as Mongoose from 'mongoose'
import { IBookingPayload, IItinerary, IPayloadPassenger } from '@modules/adapter/entities/definitions/booking-request.interface';

@Schema({
    timestamps: true
})
export class BookingRequest implements IBookingPayload {

    @Prop({
        type: String,
        required: true
    })
    IPAddress: string;

    @Prop({
        type: String,
        required: true
    })
    TokenId: string;

    @Prop({
        type: String,
        required: true
    })
    TrackingId: string;

    @Prop({
        type: String,
        required: true
    })
    ResultId: string;

    @Prop({
        type: Mongoose.Schema.Types.Mixed
    })
    Itinerary: IItinerary;

    @Prop({
        type: Mongoose.Schema.Types.Mixed
    })
    response: any;
    
    @Prop()
    meta: string;
    
    @Prop({
        type: String,
        default: DocumentStatusType.Active,
        enum: DocumentStatusType
    })
    document_status: DocumentStatusType;
}

export type BookingRequestDocument = Document<BookingRequest>;
export const BookingRequestSchema = SchemaFactory.createForClass(BookingRequest);

