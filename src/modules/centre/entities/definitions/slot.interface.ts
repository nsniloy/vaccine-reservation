import { DocumentStatusType } from "@common/enums";

export interface ISlot {
    _id?: any;
    date: Date;
    centre_id: string;
    quota_remaining: number; 
    document_status?: DocumentStatusType;
    createdAt?: Date;
    updatedAt?: Date;
}