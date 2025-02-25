import { Controller, Delete, Param} from '@nestjs/common';
import { EmployeeDraftService } from './employee-draft.service';


@Controller('drafts')
export class EmployeeDraftController {
  constructor(private readonly employeeDraftService: EmployeeDraftService) {}
  @Delete(':draftId')
  async deleteDraft(@Param('draftId') draftId:number){
    return this.employeeDraftService.deleteDraft(draftId);
  }
}
