import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsPositive, IsString } from "class-validator";

export class SlotFilterDto {

    @ApiProperty()
    @IsDate()
    start_date: Date;

    @ApiProperty()
    @IsDate()
    end_date: Date;

    @ApiProperty()
    @IsString()
    centre_id: string;
}
