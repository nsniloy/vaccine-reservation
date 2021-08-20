import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdapterBookingService } from '../services/booking.service';
import { HoldBookingDto } from '../dto/booking.dto';

@ApiTags('booking')
@Controller('booking')
export class AdapterBookingController {
  constructor(private readonly bookingService: AdapterBookingService) {}

  @ApiOperation({ description: 'Hold booking for flights' })
  @Post('hold')
  holdBooking(@Body() holdBookingDto: HoldBookingDto) {
    return this.bookingService.holdBooking(holdBookingDto);
  }

}
