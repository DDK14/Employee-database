import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
    private s3: S3Client;
    private bucket: string;
    
    constructor(private config:ConfigService){
        this.bucket=config.get<string>('S3_BUCKET');
        this.s3=new S3Client({
            endpoint:config.get<string>('S3_ENDPOINT'),
            forcePathStyle:true,
            credentials:{
                accessKeyId:config.get<string>('S3_ACCESS_KEY'),
                secretAccessKey:config.get<string>('S3_SECRET_KEY'),
            }
        })
    }

    async uploadFile(file:Express.Multer.File, employeeId:string){
        const key= `${employeeId}`
    }
}
