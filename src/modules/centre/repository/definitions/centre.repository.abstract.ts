import { ICentre } from "@modules/centre/entities/definitions/centre.interface";

export abstract class CentreRepository {
    abstract create(data: ICentre): Promise<ICentre>;
    abstract remove(_id: string): Promise<void>;
    abstract findAll(): Promise<ICentre[]>;
    abstract findOne(id: string): Promise<ICentre>;
}