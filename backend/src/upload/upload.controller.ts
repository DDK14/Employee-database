import { Controller, Get, Logger, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname, join } from "path";
import {diskStorage} from 'multer'
import * as fs from 'fs'
import { S3Service } from "src/s3/s3.service";

@Controller('upload')
export class UploadController{
    private readonly logger=new Logger(UploadController.name);
    constructor(private readonly s3Service:S3Service){}
    @Post(':id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Param('id') employeeId:string, @UploadedFile() file:Express.Multer.File){
        const res=await this.s3Service.uploadFile(file,employeeId);
        return {
            message:'Upload successful',
            url:res.url
        }
    }
}