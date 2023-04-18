import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from '../multer.config';

@Module({
  imports: [HttpModule, DatabaseModule]
})
export class AppModule {}
