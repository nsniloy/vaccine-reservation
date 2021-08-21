import { Module } from '@nestjs/common';
import { ReservationService } from './services/reservation.service';
import { ReservationController } from './controllers/reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './entities/reservation.entity';
import { ReservationRepository } from './repository/definitions/reservation.repository.abstract';
import { ReservationRepositoryMongo } from './repository/reservation.repository.mongoose';
import { CentreModule } from '@modules/centre/centre.module';
import { EmailHelper } from 'src/helpers/email.helper';

@Module({
  imports: [
    CentreModule,
    MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
  ],
  controllers: [
    ReservationController
  ],
  providers: [
    EmailHelper,
    ReservationService,
    {
      provide: ReservationRepository,
      useClass: ReservationRepositoryMongo
    }
  ]
})
export class ReservationModule {}
