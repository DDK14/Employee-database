import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './models/employee/employee';
import { EmployeeDraft } from '../employee-draft/models/employeeDraft/employeeDraft';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { __Client } from '@aws-sdk/client-s3';
import { S3Service } from 'src/s3/s3.service';



@Injectable()
export class EmployeeService {
  private readonly logger=new Logger(EmployeeService.name);
    constructor(@InjectModel(Employee) private readonly employeeModel:typeof Employee,
                @InjectModel(EmployeeDraft) private readonly draftModel:typeof EmployeeDraft,
                private readonly s3Service:S3Service,
              ){}  

    //to fetch all employees
    async findAll(){
      this.logger.log('Fetching all employees from db')
        const employees=await  this.employeeModel.findAll();

        const employeeFile=await Promise.all(
          employees.map(async (emp)=>{
            const files=await this.s3Service.listFiles(emp.id);
            return{
              ...emp.get({plain:true}),
              files,
            }
          })
        )
        return employeeFile;
    }

    //to fetch employee by id
    async findEmployeeById(id:number){

        return this.employeeModel.findByPk(id);
    }
    

    //to submit api
    async dbpush(data:CreateEmployeeDto){
      try{
      if(
        !data.name||
        !data.department ||
        !data.reportingManager
      ){
        this.logger.error('Failed to save due to missing fields')
        throw new Error('Incomplete data. Please fill all required fields.');
      }
      const employee= await this.employeeModel.upsert(data,{
        conflictFields:['id'],
      });
      return employee;
    }

      catch(error){
        console.error("Database error:", error);
        this.logger.error('Database error')
        throw new InternalServerErrorException("Failed to save employee data")
      }
    }


    //no use
    async final(draftId:number){
        const draft=await this.draftModel.findByPk(draftId);
        if(!draft){
            // throw new Error('no draft');
            this.logger.warn('No draft')
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
        dateOfJoining:draft.dateOfJoining,
        employeeCode:draft.employeeCode,
        personalEmail: draft.personalEmail,
        officialEmail: draft.officialEmail,
        contactNumber: draft.contactNumber,
        emergencyContactNumber: draft.emergencyContactNumber,
        businessUnit: draft.businessUnit,
        department: draft.department,
        reportingManager: draft.reportingManager,
      });
      this.logger.log('Draft has been saved and deleted')
      await draft.destroy();
      return emp;
    }


    
}
