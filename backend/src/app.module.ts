import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './employee/models/employee/employee';
import { EmployeeDraftModule } from './employee-draft/employee-draft.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { S3Service } from './s3/s3.service';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    host: '172.17.71.181',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'emp_db',
    models:[Employee],
    autoLoadModels: true,
    synchronize: false,
  }),
  EmployeeModule,
  UploadModule,
  EmployeeDraftModule,
  ConfigModule.forRoot({
    isGlobal:true,
  })
],
  controllers: [AppController],
  providers: [AppService,S3Service],
})
export class AppModule {}
