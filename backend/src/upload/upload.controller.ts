import { Body, Controller, Delete, Get, Logger, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { extname, join } from "path";
import {diskStorage} from 'multer'
import * as fs from 'fs'
import { S3Service } from "src/s3/s3.service";

@Controller('files')
export class UploadController{
    private readonly logger=new Logger(UploadController.name);
    constructor(private readonly s3Service:S3Service){}
    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Param('id') employeeId:string, @UploadedFile() file:Express.Multer.File){
        const res=await this.s3Service.uploadFile(file,employeeId);
        return {
            message:'Upload successful',
            url:res.url
        }
    }

    @Get('list/:id')
    async listFiles(@Param('id') employeeId:number){
        return this.s3Service.listFiles(employeeId);
    }

    @Get('download/:fileKey')
    async downloadFiles(@Param('fileKey') fileKey:string, @Res() res:Response){
        // const presignedUrl=await this.s3Service.getPresignedUrl(fileKey);
        // return{ url: presignedUrl};

        try{
            const stream=await this.s3Service.getObjectStream(fileKey);
            res.setHeader('Content-Disposition', `attachment; filename="${fileKey.split('/').pop()}"`);
            stream.pipe(res);
        }catch(err){
            this.logger.error('Download Failed',err);
            res.status(404).send('File not found');
        }
    }

    @Delete('delete/:id')
    async deleteFile( @Param('id') employeeId:string, @Body() body: {fileUrl:string}){
        try{
            await this.s3Service.deleteFileById(body.fileUrl,employeeId);
            return {message: "File has been successfully deleted"};
        }catch(err){
            this.logger.error("Delete failed",err);
        }
    }
}