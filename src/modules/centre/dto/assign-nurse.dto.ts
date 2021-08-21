import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsPositive, IsString } from "class-validator";

export class AssignNurseDto {

    @ApiProperty()
    @IsString()
    centre_id: string;

    @ApiProperty()
    @IsPositive()
    number_of_nurses: number;
    
    @ApiProperty()
    @IsDate()
    start_time: Date;

    @ApiProperty()
    @IsDate()
    end_time: Date;
}
