import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CentreService } from './services/centre.service';
import { CentreController } from './controllers/centre.controller';
import { Centre, CentreSchema } from './entities/centre.entity';
import { NurseHistory, NurseHistorySchema } from './entities/nurse-history.entity';
import { Slot, SlotSchema } from './entities/slot.entity';
import { CentreRepositoryMongo } from './repository/centre.repository.mongoose';
import { CentreRepository } from './repository/definitions/centre.repository.abstract';
import { NurseHistoryRepository } from './repository/definitions/nurse-history.repository.abstract';
import { SlotRepository } from './repository/definitions/slot.repository.abstract';
import { NurseHistoryRepositoryMongo } from './repository/nurse-history.repository.mongoose';
import { SlotRepositoryMongo } from './repository/slot.repository.mongoose';
import { SlotController } from './controllers/slot.controller';
import { HistoryController } from './controllers/nurse-history.controller';
import { SlotService } from './services/slot.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HistoryService } from './services/history.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Centre.name, schema: CentreSchema }]),
    MongooseModule.forFeature([{ name: Slot.name, schema: SlotSchema }]),
    MongooseModule.forFeature([{ name: NurseHistory.name, schema: NurseHistorySchema }]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => (
        configService.get('cache')
      ),
      inject: [ConfigService]
    })
  ],
  controllers: [
    CentreController,
    SlotController,
    HistoryController,
  ],
  providers: [
    CentreService,
    SlotService,
    HistoryService,
    {
      provide: CentreRepository,
      useClass: CentreRepositoryMongo
    },
    {
      provide: SlotRepository,
      useClass: SlotRepositoryMongo
    },
    {
      provide: NurseHistoryRepository,
      useClass: NurseHistoryRepositoryMongo
    }
  ],
  exports: [
    CentreService
  ]
})
export class CentreModule { }
