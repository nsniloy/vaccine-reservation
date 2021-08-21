import { DocumentStatusType } from "../../../../common/enums";

export interface INurseHistory {
    _id?: any;
    centre_id: string;
    centre_name: string;
    number_of_nurses: number;
    start_time: Date;
    end_time: Date;
    document_status?: DocumentStatusType;
    createdAt?: Date;
    updatedAt?: Date;
}