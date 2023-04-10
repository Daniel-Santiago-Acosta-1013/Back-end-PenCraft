import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth.module';
import mongooseConfig from './config/ORMconfig';

@Module({
  imports: [MongooseModule.forRoot(mongooseConfig), AuthModule],
})
export class AppModule {}
