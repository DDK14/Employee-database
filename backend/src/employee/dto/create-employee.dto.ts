import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

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

    @IsDate()
    @IsNotEmpty()
    dateOfJoining!: Date;

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