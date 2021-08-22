import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class UpdateReservationDto {
    
    @ApiProperty()
    @IsDate()
    date: Date;

    @ApiProperty()
    @IsString()
    centre_id: string
}