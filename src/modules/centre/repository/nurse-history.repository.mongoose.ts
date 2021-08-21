import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NurseHistory } from "../entities/nurse-history.entity";
import { NurseHistoryRepository } from "./definitions/nurse-history.repository.abstract";
import { INurseHistory } from "../entities/definitions/nurse-history.interface";
import { HistoryFilterDto } from "../dto/history-filter.dto";

@Injectable()
export class NurseHistoryRepositoryMongo extends NurseHistoryRepository {
    constructor(
        @InjectModel(NurseHistory.name) private model: Model<NurseHistory>
    ) {
        super();
    }
    async create(data: INurseHistory): Promise<void> {
        await this.model.create(data);
    }

    async findByCentreId(filter: HistoryFilterDto): Promise<INurseHistory[]> {
        let history: INurseHistory[] = await this.model.find(
            {
                centre_id: filter.centre_id,
                start_time: { $gte: filter.start_date, $lte: filter.end_date }
            },
            {
                document_status: 0, __v: 0
            }
        )
        return history;
    }

}