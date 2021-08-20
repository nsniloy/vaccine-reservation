import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CentreService } from './centre.service';
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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Centre.name, schema: CentreSchema }]),
    MongooseModule.forFeature([{ name: Slot.name, schema: SlotSchema }]),
    MongooseModule.forFeature([{ name: NurseHistory.name, schema: NurseHistorySchema }]),
  ],
  controllers: [
    CentreController
  ],
  providers: [
    CentreService,
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
  ]
})
export class CentreModule {}
