import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth.module';
import { CompanyModule } from './modules/companies.module';
import { User } from './entities/user.entity';
import { Company } from './entities/companies.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myusername',
      password: 'mypassword',
      database: 'digital-seller',
      entities: [User, Company],
      synchronize: true,
    }),
    AuthModule,
    CompanyModule,
  ],
})
export class AppModule {}
