import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { EmployeeDraft } from './models/employeeDraft/employeeDraft';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EmployeeDraftService {
  constructor(
    @InjectModel(EmployeeDraft) private readonly draftModel:typeof EmployeeDraft,
  ){}
  async saveDraft(draftData:Partial<CreateEmployeeDto>,draftId?:number){
    if(draftId){
        return this.draftModel.update(draftData,{where:{id:draftId}});
    }
    return this.draftModel.create(draftData);
}
  async findDraft(draftId:number){
    return this.draftModel.findByPk(draftId);
  }
}
