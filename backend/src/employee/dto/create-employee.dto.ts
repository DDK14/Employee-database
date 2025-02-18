import { Transform, Type } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateEmployeeDto{
    @IsString()
    @IsNotEmpty()
    name!:string;

    @IsString()
    @IsNotEmpty()
    proposedRole!: string;

    @IsString()
    @IsNotEmpty()
    location!: string;

    @IsDateString()
    @IsNotEmpty()
    @Transform(({ value }) => value.split('T')[0])
    // @Type(()=>Date)
    dateOfJoining!: string;

    @IsString()
    @IsNotEmpty()
    employeeCode!: string;

    @IsEmail()
    @IsNotEmpty()
    personalEmail!: string;

    @IsEmail()
    officialEmail!: string;

    @IsPhoneNumber('IN') 
    @IsNotEmpty()
    contactNumber!: string;

    @IsPhoneNumber('IN') 
    emergencyContactNumber!: string;

    @IsString()
    @IsNotEmpty()
    businessUnit!: string;

    @IsString()
    @IsNotEmpty()
    department!: string;

    @IsString()
    @IsNotEmpty()
    reportingManager!: string;
}