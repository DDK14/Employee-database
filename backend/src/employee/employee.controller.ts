import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './models/employee/employee';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Op, where } from 'sequelize';
import { EmployeeDraftService } from 'src/employee-draft/employee-draft.service';
@Controller('employee')
export class EmployeeController {
  private readonly logger= new Logger(EmployeeController.name);
    constructor(private readonly employeeService:EmployeeService,
      private readonly employeeDraftService:EmployeeDraftService,
    ){}

  //   @Post()
  //   async createEmployee(@Body()  createEmployeeDto: CreateEmployeeDto ){
  //       return this.employeeService.createEmployee(createEmployeeDto);
  //   } 

    @Get()
    async findAll() {
    this.logger.log('Fetching all employees')
    return this.employeeService.findAll();
  }

  @Get(':id')
  async findEmployeeById(@Param('id') id: number) {
    this.logger.debug('Fetching employee by id: ${id}')
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
    console.log("req api with id in string", draftId)
    const draftNumId=draftId ? Number(draftId) :undefined;
    console.log("api call with id:", draftNumId)
    this.logger.debug('Saving draft with id: ${draftId}')
    return this.employeeDraftService.saveDraft(draftData,draftNumId);
  }
  @Post('/final/:draftId')
  async final(@Param('draftId') draftId:number){
    return this.employeeService.final(draftId);
  }

  @Post('/submit')
  async dbpush(@Body() data:CreateEmployeeDto){
    this.logger.debug('Final submit to the database')
    return this.employeeService.dbpush(data);
  }



 
}
