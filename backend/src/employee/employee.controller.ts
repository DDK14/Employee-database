import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './models/employee/employee';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Op, where } from 'sequelize';
import { EmployeeDraftService } from 'src/employee-draft/employee-draft.service';
@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService:EmployeeService,
      private readonly employeeDraftService:EmployeeDraftService,
    ){}

  //   @Post()
  //   async createEmployee(@Body()  createEmployeeDto: CreateEmployeeDto ){
  //       return this.employeeService.createEmployee(createEmployeeDto);
  //   } 

    @Get()
    async findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  async findEmployeeById(@Param('id') id: number) {
    return this.employeeService.findEmployeeById(id);
  }

  // @Get('search')
  // async findEmployee(query:any):Promise<Employee[]>{
  //   const whereClause: any={}
  //   Object.keys(query).forEach((key)=>{
  //     whereClause[key]={
  //       [Op.like]: '%${query[key]}%',
  //     }
  //   });
  //   return Employee.findAll({where: whereClause});
  // }
  @Post('/draft')
  async saveDraft(@Body() draftData:Partial<CreateEmployeeDto>,@Query('draftId') draftId?: string){
    const draftNumId=draftId ? Number(draftId) :undefined;
    return this.employeeDraftService.saveDraft(draftData,draftNumId);
  }
  @Post('/final/:draftId')
  async final(@Param('draftId') draftId:number){
    return this.employeeService.final(draftId);
  }
}
