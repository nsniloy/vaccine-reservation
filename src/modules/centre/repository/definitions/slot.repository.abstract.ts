import { SlotFilterDto } from "../../dto/slot-filter.dto";
import { ISlot } from "../../entities/definitions/slot.interface";

export abstract class SlotRepository {
    abstract createMany(data: ISlot[]): Promise<ISlot[]>;
    abstract removeByCentreId(_id: string): Promise<void>;
    abstract reserveSlot(centre_id: string, start_time: Date, end_time: Date, session: any): Promise<ISlot>;
    abstract findByCentreId(filter: SlotFilterDto): Promise<ISlot[]>;
    abstract checkIfExists(filter: SlotFilterDto): Promise<boolean>;
    abstract increaseQuota(_id: string, count: number, session: any): Promise<void>;
}