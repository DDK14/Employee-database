import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './models/employee/employee';
import { EmployeeDraft } from '../employee-draft/models/employeeDraft/employeeDraft';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
    constructor(@InjectModel(Employee) private readonly employeeModel:typeof Employee,
                @InjectModel(EmployeeDraft) private readonly draftModel:typeof EmployeeDraft,
              ){}  
    // async createEmployee(data:Partial<Employee>){
    //     return this.employeeModel.create(data);
    // }
    async findAll(){
        return this.employeeModel.findAll();
    }
    async findEmployeeById(id:number){
        return this.employeeModel.findByPk(id);
    }
    
    async dbpush(data:CreateEmployeeDto){
      try{
      if(
        !data.name||
        !data.department ||
        !data.reportingManager
      ){
        throw new Error('Incomplete data. Please fill all required fields.');
      }
      return await this.employeeModel.create(data);}
      catch(error){
        console.error("Database error:", error);
        throw new InternalServerErrorException("Failed to save employee data")
      }
    }

    async final(draftId:number){
        const draft=await this.draftModel.findByPk(draftId);
        if(!draft){
            throw new Error('no draft');
        }
    if (
        !draft.name ||
        !draft.officialEmail ||
        !draft.contactNumber ||
        !draft.department ||
        !draft.reportingManager
      ) {
        throw new Error('Incomplete data. Please fill all required fields.');
      }
      const emp= await this.employeeModel.create({
        name:draft.name,
        proposedRole:draft.proposedRole,
        location:draft.location,
        // dateOfJoining:draft.dateOfJoining,
        employeeCode:draft.employeeCode,
        personalEmail: draft.personalEmail,
        officialEmail: draft.officialEmail,
        contactNumber: draft.contactNumber,
        emergencyContactNumber: draft.emergencyContactNumber,
        businessUnit: draft.businessUnit,
        department: draft.department,
        reportingManager: draft.reportingManager,
      });

      await draft.destroy();
      return emp;
    }
}
