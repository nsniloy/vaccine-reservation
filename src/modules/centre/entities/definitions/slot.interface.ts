import { DocumentStatusType } from "@common/enums";

export interface ISlot {
    _id?: any;
    time: Date;
    centre_id: string;
    is_booked: boolean; 
    document_status?: DocumentStatusType;
    createdAt?: Date;
    updatedAt?: Date;
}