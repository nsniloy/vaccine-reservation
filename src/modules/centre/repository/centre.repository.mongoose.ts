import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Centre, CentreDocument } from "../entities/centre.entity";
import { CentreRepository } from "./definitions/centre.repository.abstract";
import { ICentre } from "../entities/definitions/centre.interface";
import { DocumentStatusType } from "../../../common/enums";

@Injectable()
export class CentreRepositoryMongo extends CentreRepository {
    constructor(
        @InjectModel(Centre.name) private model: Model<Centre>
    ) {
        super();
    }
    async create(data: ICentre): Promise<ICentre> {
        let centre: ICentre = (await this.model.create(data)).toJSON()
        return centre;
    }

    async findAll(): Promise<ICentre[]> {
        let centres: ICentre[] = await this.model.find(
            {
                document_status: DocumentStatusType.Active
            },
            {
                document_status: 0, __v: 0
            }
        )
        return centres;
    }

    async findOne(id: string): Promise<ICentre> {
        let centre: ICentre = await this.model.findById(
            id,
            {
                document_status: 0, __v: 0
            }
        )
        return centre;
    }

    async remove(id: string): Promise<void> {
        await this.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    document_status: DocumentStatusType.Deleted
                }
            },
            {
                new: true
            }
        );
    }

}