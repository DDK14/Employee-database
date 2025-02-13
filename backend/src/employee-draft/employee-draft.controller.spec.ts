import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDraftController } from './employee-draft.controller';
import { EmployeeDraftService } from './employee-draft.service';

describe('EmployeeDraftController', () => {
  let controller: EmployeeDraftController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeDraftController],
      providers: [EmployeeDraftService],
    }).compile();

    controller = module.get<EmployeeDraftController>(EmployeeDraftController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
