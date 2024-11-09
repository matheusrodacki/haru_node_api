import { Test, TestingModule } from '@nestjs/testing';
import { IndividualsController } from './individuals.controller';
import { IndividualsService } from './individuals.service';

describe('IndividualsController', () => {
  let controller: IndividualsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndividualsController],
      providers: [IndividualsService],
    }).compile();

    controller = module.get<IndividualsController>(IndividualsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
