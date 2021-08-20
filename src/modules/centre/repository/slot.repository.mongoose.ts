import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Slot, SlotDocument } from "../entities/slot.entity";
import { SlotRepository } from "./definitions/slot.repository.abstract";
import { ISlot } from "../entities/definitions/slot.interface";
import { DocumentStatusType } from "@common/enums";

@Injectable()
export class SlotRepositoryMongo extends SlotRepository {
    constructor(
        @InjectModel(Slot.name) private model: Model<Slot>
    ) {
        super();
    }
    async create(data: ISlot): Promise<ISlot> {
        let slot: ISlot = (await this.model.create(data)).toJSON()
        return slot;
    }

    async findByCentreId(id: string): Promise<ISlot[]> {
        let slots: ISlot[] = await this.model.find(
            {
                document_status: DocumentStatusType.Active,
                centre_id: id
            }, {
            document_status: 0, __v: 0
        }
        )
        return slots;
    }

    async removeByCentreId(id: string): Promise<void> {
        await this.model.updateMany(
            { 
                centre_id: id 
            },
            {
                $set: {
                    document_status: DocumentStatusType.Deleted
                }
            }
        )
        return;
    }

}