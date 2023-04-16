import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth.module';
import { ProductModule } from './modules/product.module';
import { EmployeeModule } from './modules/employee.module';
import { CompanyModule } from './modules/company.module';
import { UserDataModule } from './modules/userData.module';
import mongooseConfig from './config/ORMconfig';

@Module({
  imports: [
    MongooseModule.forRoot(mongooseConfig),
    AuthModule,
    ProductModule,
    EmployeeModule,
    CompanyModule,
    UserDataModule
  ],
})
export class AppModule {}
