import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailHelper } from 'src/helpers/email.helper';
import { AdapterBookingController } from './controllers/booking.controller';
import { BookingRequest, BookingRequestSchema } from './entities/booking-request.entity';
import { BookingRequestRepositoryMongo } from './repository/booking-request.repository.mongoose';
import { BookingRequestRepository } from './repository/definitions/booking-request.repository.abstract';
import { AdapterBookingService } from './services/booking.service';


@Module({
  imports: [
    HttpModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => (
        configService.get('cache')
      ),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([{ name: BookingRequest.name, schema: BookingRequestSchema }]),
  ],
  controllers: [
    AdapterBookingController,
  ],
  providers: [
    EmailHelper,
    AdapterBookingService, 
    {
      provide: BookingRequestRepository,
      useClass: BookingRequestRepositoryMongo
    }
  ]
})
export class AdapterModule { }
