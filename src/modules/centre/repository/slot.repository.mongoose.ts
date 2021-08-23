import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Slot, SlotDocument } from "../entities/slot.entity";
import { SlotRepository } from "./definitions/slot.repository.abstract";
import { ISlot } from "../entities/definitions/slot.interface";
import { DocumentStatusType } from "../../../common/enums";
import { SlotFilterDto } from "../dto/slot-filter.dto";

@Injectable()
export class SlotRepositoryMongo extends SlotRepository {
    constructor(
        @InjectModel(Slot.name) private model: Model<Slot>
    ) {
        super();
    }
    async createMany(data: ISlot[]): Promise<ISlot[]> {
        return await this.model.insertMany(data);
    }

    async findByCentreId(filter: SlotFilterDto): Promise<ISlot[]> {
        let slots: ISlot[] = await this.model.find(
            {
                document_status: DocumentStatusType.Active,
                centre_id: filter.centre_id,
                date: { $gte: filter.start_date, $lte: filter.end_date }
            },
            {
                document_status: 0, __v: 0
            }
        ).sort({ createdAt: -1 })
        return slots;
    }

    async checkIfExists(filter: SlotFilterDto): Promise<boolean> {
        let slot: ISlot = await this.model.findOne(
            {
                centre_id: filter.centre_id,
                date: { $gte: filter.start_date, $lte: filter.end_date }
            },
            {
                document_status: 0, __v: 0
            }
        )
        if (slot) {
            return true
        }
        return false;
    }

    async reserveSlot(centre_id: string, start_time: Date, end_time: Date, session: any): Promise<ISlot> {
        return await this.model.findOneAndUpdate(
            {
                centre_id: centre_id,
                date: { $gte: start_time, $lte: end_time },
                quota_remaining: { $gt: 0 }
            },
            {
                $inc: {
                    quota_remaining: -1
                }
            },
            {
                session,
                new: true
            }
        )
    }

    async increaseQuota(id: string, count: number, session: any): Promise<void> {
        await this.model.findByIdAndUpdate(
            id,
            {
                $inc: {
                    quota_remaining: count
                }
            },
            {
                session
            }
        )
    }

    async removeByCentreId(id: string): Promise<void> {
        await this.model.updateMany(
            {
                centre_id: id,
                is_booked: false
            },
            {
                $set: {
                    document_status: DocumentStatusType.Deleted
                }
            }
        );
    }

}