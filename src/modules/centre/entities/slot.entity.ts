import { DocumentStatusType } from '@common/enums/status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true
})
export class Slot extends Document {

    @Prop({
        type: Date,
        required: true
    })
    time: Date;

    @Prop({
        type: String,
        index: true,
        required: true
    })
    centre_id: string;

    @Prop({
        type: Boolean,
        default: false
    })
    is_booked: boolean;
    
    @Prop({
        type: String,
        index: true,
        default: DocumentStatusType.Active,
        enum: DocumentStatusType
    })
    document_status: DocumentStatusType;
}

export type SlotDocument = Document<Slot>;
export const SlotSchema = SchemaFactory.createForClass(Slot);

