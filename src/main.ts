import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as multer from 'multer';
import { json, urlencoded } from 'body-parser'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(multer().any());
  app.use(json())
  app.use(urlencoded({ extended: true }))
  app.enableCors()

  await app.listen(4000);
}
bootstrap();
