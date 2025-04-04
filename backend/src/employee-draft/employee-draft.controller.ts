import { Controller, Delete, Get, Param} from '@nestjs/common';
import { EmployeeDraftService } from './employee-draft.service';


@Controller('drafts')
export class EmployeeDraftController {
  constructor(private readonly employeeDraftService: EmployeeDraftService) {}
  @Delete(':draftId')
  async deleteDraft(@Param('draftId') draftId:number){
    return this.employeeDraftService.deleteDraft(draftId);
  }

  @Get()
  async findDrafts(){
    // this.logger.log("Fetching all drafts")
    return this.employeeDraftService.getDrafts();
  }
}
