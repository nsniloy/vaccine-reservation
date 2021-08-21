import { HistoryFilterDto } from "../../../centre/dto/history-filter.dto";
import { INurseHistory } from "../../entities/definitions/nurse-history.interface";

export abstract class NurseHistoryRepository {
    abstract create(data: INurseHistory): Promise<void>;
    abstract findByCentreId(filter: HistoryFilterDto): Promise<INurseHistory[]>;
}