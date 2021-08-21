import { DocumentStatusType } from '@common/enums/status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true
})
export class NurseHistory extends Document {

    @Prop({
        type: Number,
        required: true
    })
    number_of_nurses: number;

    @Prop({
        type: String,
        required: true
    })
    centre_id: string;

    @Prop({
        type: String,
        required: true
    })
    centre_name: string;

    @Prop({
        type: Date,
        required: true
    })
    start_time: Date;
    
    @Prop({
        type: Date,
        required: true
    })
    end_time: Date;

    @Prop({
        type: String,
        default: DocumentStatusType.Active,
        enum: DocumentStatusType
    })
    document_status: DocumentStatusType;
}

export type NurseHistoryDocument = Document<NurseHistory>;
export const NurseHistorySchema = SchemaFactory.createForClass(NurseHistory);

