import { Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
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

  @Get(':draftId')
  async findDraftsById(@Param('draftId') draftId:number){
    return this.employeeDraftService.getDraftsById(draftId);
  }

   @Post('/signin')
  async signinEmployee(@Body() body: {personalEmail:string}){
    return await this.employeeDraftService.signinByEmail(body.personalEmail);
    // return {id:employee.id};
  }
}
