import { Module } from '@nestjs/common';
import { EmployeeDraftService } from './employee-draft.service';
import { EmployeeDraftController } from './employee-draft.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeDraft } from './models/employeeDraft/employeeDraft';

@Module({
  imports: [SequelizeModule.forFeature([EmployeeDraft])],
  controllers: [EmployeeDraftController],
  providers: [EmployeeDraftService],
  exports: [SequelizeModule]
})
export class EmployeeDraftModule {}
