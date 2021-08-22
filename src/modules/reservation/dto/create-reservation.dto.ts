import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsPositive, IsDate, IsEmail } from "class-validator";

export class CreateReservationDto {
    
    @ApiProperty()
    @IsDate()
    date: Date;

    @ApiProperty()
    @IsString()
    full_name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    national_id: string;

    @ApiProperty()
    @IsString()
    centre_id: string
}
