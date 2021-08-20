import { DocumentStatusType } from "@common/enums";

export interface ISupplyHistory {
    _id?: any;
    nurse_name: string;
    start_time: Date;
    end_time: Date;
    document_status?: DocumentStatusType;
    createdAt?: Date;
    updatedAt?: Date;
}