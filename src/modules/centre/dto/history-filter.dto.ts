import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class HistoryFilterDto {

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
