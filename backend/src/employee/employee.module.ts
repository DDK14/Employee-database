import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './models/employee/employee';
import { EmployeeDraftService } from 'src/employee-draft/employee-draft.service';
import { EmployeeDraftModule } from 'src/employee-draft/employee-draft.module';
import { EmployeeDraft } from 'src/employee-draft/models/employeeDraft/employeeDraft';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports:[SequelizeModule.forFeature([Employee,EmployeeDraft]),EmployeeDraftModule],
  providers: [EmployeeService,EmployeeDraftService,S3Service],
  controllers: [EmployeeController],
  exports:[EmployeeService]
})
export class EmployeeModule {}
