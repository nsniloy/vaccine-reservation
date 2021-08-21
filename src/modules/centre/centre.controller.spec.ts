import { Test, TestingModule } from '@nestjs/testing';
import { CentreController } from './controllers/centre.controller';
import { CentreService } from './services/centre.service';

describe('CentreController', () => {
  let controller: CentreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CentreController],
      providers: [CentreService],
    }).compile();

    controller = module.get<CentreController>(CentreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
