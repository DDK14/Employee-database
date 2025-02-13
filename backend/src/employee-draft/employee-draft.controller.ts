import { Controller} from '@nestjs/common';
import { EmployeeDraftService } from './employee-draft.service';


@Controller('employee-draft')
export class EmployeeDraftController {
  constructor(private readonly employeeDraftService: EmployeeDraftService) {}
  
}
