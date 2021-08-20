import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CentreService } from './centre.service';
import { CentreController } from './controllers/centre.controller';
import { Centre, CentreSchema } from './entities/centre.entity';
import { CentreRepositoryMongo } from './repository/centre.repository.mongoose';
import { CentreRepository } from './repository/definitions/centre.repository.abstract';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Centre.name, schema: CentreSchema }])
  ],
  controllers: [
    CentreController
  ],
  providers: [
    CentreService,
    {
      provide: CentreRepository,
      useClass: CentreRepositoryMongo
    }
  ]
})
export class CentreModule {}
