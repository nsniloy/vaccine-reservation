import { DocumentStatusType } from '@common/enums/status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true
})
export class SupplyHistory extends Document {

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

export type SupplyHistoryDocument = Document<SupplyHistory>;
export const SupplyHistorySchema = SchemaFactory.createForClass(SupplyHistory);

