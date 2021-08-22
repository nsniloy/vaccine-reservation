import { DocumentStatusType } from "../../../../common/enums";

export interface IReservation {
    full_name: string;
    email: string;
    national_id: string;
    slot_id: string;
    centre_id: string;
    date: Date;
    document_status?: DocumentStatusType;
    createdAt?: Date;
    updatedAt?: Date;
}
