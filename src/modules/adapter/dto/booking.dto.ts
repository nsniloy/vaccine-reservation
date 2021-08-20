import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Type } from 'class-transformer';

export class HoldBookingDto {
    @ApiProperty()
    @IsString()
    flex_id: string;
}