import { HistoryFilterDto } from "@modules/centre/dto/history-filter.dto";
import { INurseHistory } from "@modules/centre/entities/definitions/nurse-history.interface";

export abstract class NurseHistoryRepository {
    abstract create(data: INurseHistory): Promise<void>;
    abstract findByCentreId(filter: HistoryFilterDto): Promise<INurseHistory[]>;
}