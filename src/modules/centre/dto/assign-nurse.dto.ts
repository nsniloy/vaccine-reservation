import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsPositive, IsString } from "class-validator";

export class AssignNurseDto {

    @ApiProperty()
    @IsString()
    centre_id: string;

    @ApiProperty()
    @IsPositive()
    number_of_nurses: number;
    
    @ApiProperty()
    @IsString()
    start_time: string;

    @ApiProperty()
    @IsString()
    end_time: string;

    @ApiProperty()
    @IsArray()
    dates: string[];
}
