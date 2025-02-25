import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { EmployeeDraft } from './models/employeeDraft/employeeDraft';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EmployeeDraftService {
  constructor(
    @InjectModel(EmployeeDraft) private readonly draftModel:typeof EmployeeDraft,
  ){}
  async saveDraft(draftData:Partial<CreateEmployeeDto>,draftId?:number){
    console.log("draftID" ,draftId);
    if(draftId){
      const exisiting=await this.draftModel.findByPk(draftId);
      console.log("exisiting", exisiting)
      if(exisiting){
        await exisiting.update(draftData);
        return exisiting;
      }
      // await this.draftModel.update(draftData,{where:{id:draftId}});
      //   return 
    }
    return await this.draftModel.create(draftData);
}
  async findDraft(draftId:number){
    return this.draftModel.findByPk(draftId);
  }
  async deleteDraft(draftId:number){
    const draft=await this.draftModel.findByPk(draftId);
    if(!draft){
      throw new NotFoundException(`draft with ID ${draftId} not found`);
    }
    await draft.destroy();
    return {message:'Draft deleted successfully'};
  }

}
