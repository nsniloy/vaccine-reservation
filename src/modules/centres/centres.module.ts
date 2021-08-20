import { Module } from '@nestjs/common';
import { CentresService } from './centres.service';
import { CentresController } from './controllers/centres.controller';

@Module({
  controllers: [CentresController],
  providers: [CentresService]
})
export class CentresModule {}
