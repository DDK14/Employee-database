import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDraftService } from './employee-draft.service';

describe('EmployeeDraftService', () => {
  let service: EmployeeDraftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeDraftService],
    }).compile();

    service = module.get<EmployeeDraftService>(EmployeeDraftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
