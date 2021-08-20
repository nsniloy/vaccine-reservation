
import { Injectable } from '@nestjs/common';
import { EmailHelper } from 'src/helpers/email.helper';
import { HoldBookingDto } from '../dto/booking.dto';
import { BookingRequestRepository } from '../repository/definitions/booking-request.repository.abstract';

@Injectable()
export class AdapterBookingService {
  constructor(
    private readonly bookingRequestRepository: BookingRequestRepository,
    private readonly emailHelper: EmailHelper
  ) { }

  async holdBooking(holdBookingDto: HoldBookingDto) {
    
    return
  }

}
