import { ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
    private s3: S3Client;
    private bucket: string;
    
    constructor(private config:ConfigService){
        this.bucket=config.get<string>('S3_BUCKET');
        this.s3=new S3Client({
            region: 'us-east-1',
            endpoint:config.get<string>('S3_ENDPOINT'),
            forcePathStyle:true,
            credentials:{
                accessKeyId:config.get<string>('S3_ACCESS_KEY'),
                secretAccessKey:config.get<string>('S3_SECRET_KEY'),
            }
        })
    }
//to upload files
    async uploadFile(file:Express.Multer.File, employeeId:string){
        const key= `${employeeId}/${Date.now()}-${file.originalname}`;
        const command= new PutObjectCommand({
            Bucket:this.bucket,
            Key:key,
            Body:file.buffer,
            ContentType:file.mimetype
        });
        await this.s3.send(command);
        const url=`${this.s3.config.endpoint}/${this.bucket}/${key}`;
        return {url,key};
    }

    //to take files
    async listFiles(employeeId:number): Promise<string[]>{
        const prefix=`${employeeId}/`;
        const command=new ListObjectsV2Command({
            Bucket:this.bucket,
            Prefix:prefix,
        });
        const res=await this.s3.send(command);
        return(
            res.Contents?.map((obj)=>{
                return `${this.s3.config.endpoint}/${this.bucket}/${obj.Key}`
            }) || []
        )

    }


}
