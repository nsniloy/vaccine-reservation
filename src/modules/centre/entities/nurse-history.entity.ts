import { DocumentStatusType } from '@common/enums/status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true
})
export class NurseHistory extends Document {

    @Prop({
        type: String,
        required: true
    })
    nurse_name: string;

    @Prop({
        type: Date,
        required: true
    })
    date: Date;
    
    @Prop({
        type: String,
        default: DocumentStatusType.Active,
        enum: DocumentStatusType
    })
    document_status: DocumentStatusType;
}

export type NurseHistoryDocument = Document<NurseHistory>;
export const NurseHistorySchema = SchemaFactory.createForClass(NurseHistory);

