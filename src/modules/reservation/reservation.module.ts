import { CacheModule, Module } from '@nestjs/common';
import { ReservationService } from './services/reservation.service';
import { ReservationController } from './controllers/reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './entities/reservation.entity';
import { ReservationRepository } from './repository/definitions/reservation.repository.abstract';
import { ReservationRepositoryMongo } from './repository/reservation.repository.mongoose';
import { CentreModule } from '../centre/centre.module';
import { EmailHelper } from '../../helpers/email.helper';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CentreModule,
    MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => (
        configService.get('cache')
      ),
      inject: [ConfigService]
    })
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
