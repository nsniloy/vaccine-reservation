import { DocumentStatusType } from '../../../common/enums/status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true
})
export class Reservation extends Document {

    @Prop({
        type: String,
        required: true
    })
    full_name: string;

    @Prop({
        type: String,
        required: true
    })
    email: string;

    @Prop({
        type: String,
        required: true,
        unique: true
    })
    national_id: string;

    @Prop({
        type: String,
        required: true
    })
    slot_id: string;

    @Prop({
        type: String,
        required: true
    })
    centre_id: string;

    @Prop({
        type: Date,
        required: true
    })
    date: Date;
    
    @Prop({
        type: String,
        index: true,
        default: DocumentStatusType.Active,
        enum: DocumentStatusType
    })
    document_status: DocumentStatusType;
}

export type ReservationDocument = Document<Reservation>;
export const ReservationSchema = SchemaFactory.createForClass(Reservation);

