import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NurseHistory } from "../entities/nurse-history.entity";
import { NurseHistoryRepository } from "./definitions/nurse-history.repository.abstract";
import { INurseHistory } from "../entities/definitions/nurse-history.interface";

@Injectable()
export class NurseHistoryRepositoryMongo extends NurseHistoryRepository {
    constructor(
        @InjectModel(NurseHistory.name) private model: Model<NurseHistory>
    ) {
        super();
    }
    async create(data: INurseHistory): Promise<void> {
        await this.model.create(data);
        return
    }

}