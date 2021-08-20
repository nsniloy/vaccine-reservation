import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class AssignNurseDto {

    @ApiProperty()
    @IsString()
    centre_id: string;

    @ApiProperty()
    @IsString()
    nurse_name: string;
    
    @ApiProperty()
    @IsDate()
    start_time: Date;

    @ApiProperty()
    @IsDate()
    end_time: Date;
}
