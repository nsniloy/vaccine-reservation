import { Test, TestingModule } from '@nestjs/testing';
import { CentresController } from './controllers/centres.controller';
import { CentresService } from './centres.service';

describe('CentresController', () => {
  let controller: CentresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CentresController],
      providers: [CentresService],
    }).compile();

    controller = module.get<CentresController>(CentresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
