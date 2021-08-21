import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ReservationService } from '../services/reservation.service';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReservationFilterDto } from '../dto/reservation-filter.dto';

@ApiTags('Reservation')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Post()
  @ApiOperation({ description: 'Creates a reservation.' })
  async create(@Body() createReservationDto: CreateReservationDto) {
    return {
      data: await this.reservationService.create(createReservationDto),
      message: 'Reservation created successfully!'
    };
  }

  @Get()
  @ApiOperation({ description: 'Shows all reservations.' })
  async findAll(@Query() filter: ReservationFilterDto) {
    return await this.reservationService.findAll(filter);
  }

  @Put(':id')
  @ApiOperation({ description: 'Updates a reservation.' })
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return {
      ...await this.reservationService.update(id, updateReservationDto),
      message: 'Reservation updated successfully!'
    }
  }

  @Delete(':id')
  @ApiOperation({ description: 'Deletes a reservation.' })
  async remove(@Param('id') id: string) {
    await this.reservationService.remove(id);
    return {
      message: 'Reservation deleted successfully!'
    };
  }
}
