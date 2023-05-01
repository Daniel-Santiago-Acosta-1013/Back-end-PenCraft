import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth.module';
import ormconfig from './config/ORMconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), AuthModule],
})

export class AppModule {}
