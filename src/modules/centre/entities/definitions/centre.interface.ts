import { DocumentStatusType } from "@common/enums";

export interface ICentre {
    _id?: any;
    name: string;
    address: string;
    vaccination_duration: number; //the needed time to complete vaccination for each person (in minutes)
    document_status?: DocumentStatusType;
    createdAt?: Date;
    updatedAt?: Date;
}