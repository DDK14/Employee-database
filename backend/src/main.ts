import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useLogger(new Logger());
  app.enableCors({
    origin:"http://localhost:3001",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:'Content-Type, Accept, x-requested-with'
  })

  app.useStaticAssets(join(__dirname, '..','upload')),{
    prefix:'/upload/',
  }

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
  Logger.log('Application is running on: http://localhost:3000');
}
bootstrap();
