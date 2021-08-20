import { DocumentStatusType } from '@common/enums/status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true
})
export class Centre extends Document {

    @Prop({
        type: String,
        required: true
    })
    name: string;

    @Prop({
        type: String,
        required: true
    })
    address: string;

    @Prop({
        type: Number,
        required: true
    })
    vaccination_duration: number;
    
    @Prop({
        type: String,
        index: true,
        default: DocumentStatusType.Active,
        enum: DocumentStatusType
    })
    document_status: DocumentStatusType;
}

export type CentreDocument = Document<Centre>;
export const CentreSchema = SchemaFactory.createForClass(Centre);

