import { ISlot } from "@modules/centre/entities/definitions/slot.interface";

export abstract class SlotRepository {
    abstract create(data: ISlot): Promise<ISlot>;
    abstract removeByCentreId(_id: string): Promise<void>;
    abstract findByCentreId(_id: string): Promise<ISlot[]>;
}