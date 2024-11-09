import { Test, TestingModule } from '@nestjs/testing';
import { IndividualsService } from './individuals.service';

describe('IndividualsService', () => {
  let service: IndividualsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndividualsService],
    }).compile();

    service = module.get<IndividualsService>(IndividualsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
