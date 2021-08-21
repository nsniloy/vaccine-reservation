import { SlotFilterDto } from "@modules/centre/dto/slot-filter.dto";
import { ISlot } from "@modules/centre/entities/definitions/slot.interface";

export abstract class SlotRepository {
    abstract createMany(data: ISlot[]): Promise<ISlot[]>;
    abstract removeByCentreId(_id: string): Promise<void>;
    abstract reserveSlot(centre_id: string, start_time: Date, end_time: Date, session: any): Promise<ISlot>;
    abstract findByCentreId(filter: SlotFilterDto): Promise<ISlot[]>;
    abstract increaseQuota(_id: string, count: number, session: any): Promise<void>;
}