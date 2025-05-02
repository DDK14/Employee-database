import { Controller, Get, Logger, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname, join } from "path";
import {diskStorage} from 'multer'
import * as fs from 'fs'

@Controller('upload')
export class UploadController{
    private readonly logger=new Logger(UploadController.name);
    @Post(':id')
    @UseInterceptors(
        FileInterceptor('file',{
            storage:diskStorage({
                destination:(req,file,cb)=>{
                    const userId=req.params.id;
                    const dir=`./uploads/${userId}`;
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                        console.log(`Directory created: ${dir}`);
                      }
                    cb(null,dir);
                },
                filename:(req,file,cb)=>{
                    const unqiueSuffix = Date.now()+ '-' + Math.round(Math.random()*1e9);
                    console.log(`Generated filename: ${unqiueSuffix}${extname(file.originalname)}`);
                    cb(null, `${unqiueSuffix}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    uploadFile(@Param('id') userId:string, @UploadedFile() file:Express.Multer.File){
        this.logger.log(`Uploaded file for user ${userId}: ${file.filename}`);
        return{
            filename:file.filename,
            message: 'File uploaded successfully',
            path:`http://localhost:3000/uploads/${userId}/${file.filename}`,
            userId,
        };
    }

    @Get(':id')
    getUploadedFiles(@Param('id') userId:string){
        const userDir=join(__dirname,'..','..','uploads',userId);
        if(!fs.existsSync(userDir)){
            this.logger.warn(`Directory not found for ${userId}`);
            return [];
        }
        const files=fs.readdirSync(userDir);
        return files.map((file)=>({
            filename:file,
            path:`http://localhost:3000/uploads/${userId}/${file}`
        }))
    }
}