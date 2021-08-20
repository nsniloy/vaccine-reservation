import { INurseHistory } from "@modules/centre/entities/definitions/nurse-history.interface";

export abstract class NurseHistoryRepository {
    abstract create(data: INurseHistory): Promise<void>;
}