import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsPositive, IsDate } from "class-validator";

export class ReservationFilterDto {

    @ApiProperty()
    @IsDate()
    start_date: Date;

    @ApiProperty()
    @IsDate()
    end_date: Date;
}
