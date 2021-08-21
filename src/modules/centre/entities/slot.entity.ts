import { DocumentStatusType } from '../../../common/enums/status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true
})
export class Slot extends Document {

    @Prop({
        type: Date,
        index: true,
        required: true
    })
    date: Date;

    @Prop({
        type: String,
        index: true,
        required: true
    })
    centre_id: string;

    @Prop({
        type: Number,
        required: true,
        min: 0
    })
    quota_remaining: number;
    
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

