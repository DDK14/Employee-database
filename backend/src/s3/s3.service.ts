import { ListObjectsV2Command, PutObjectCommand, S3Client, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Readable } from 'stream';

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
        
        const presignedUrls = await Promise.all(
            (res.Contents || []).map(async (obj) => {
                return await this.getPresignedUrl(obj.Key);
            })
        );
        
        return presignedUrls;
    }

    async getObjectStream(key:string){
        const command=new GetObjectCommand({
            Bucket:this.bucket,
            Key:key,
        });
        const res=await this.s3.send(command)
        return res.Body as Readable;
    }

    async getPresignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });

        return await getSignedUrl(this.s3, command, { expiresIn });
    }


    //to delete file
    async deleteFileById(fileUrl:string, employeeId:string): Promise<void>{
        const fullPath=decodeURIComponent(new URL(fileUrl).pathname.slice(1));
        const fileKey=fullPath.replace(`${this.bucket}/`,'');
        const command=new DeleteObjectCommand({
            Bucket:this.bucket,
            Key:fileKey,

        });
        await this.s3.send(command);
    }
}
