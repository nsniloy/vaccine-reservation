import { ApiProperty } from "@nestjs/swagger";
import { IsPositive, IsString } from "class-validator";

export class CreateCentreDto {
    @ApiProperty()
    @IsString()
    name: string;
    
    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsPositive()
    vaccination_duration: number;
}
