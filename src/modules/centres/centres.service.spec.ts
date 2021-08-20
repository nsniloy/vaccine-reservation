import { Test, TestingModule } from '@nestjs/testing';
import { CentresService } from './centres.service';

describe('CentresService', () => {
  let service: CentresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CentresService],
    }).compile();

    service = module.get<CentresService>(CentresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
