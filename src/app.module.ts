import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth.module';
import { ProductModule } from './modules/product.module';
import { EmployeeModule } from './modules/employee.module';
import mongooseConfig from './config/ORMconfig';

@Module({
  imports: [
    MongooseModule.forRoot(mongooseConfig),
    AuthModule,
    ProductModule,
    EmployeeModule,
  ],
})
export class AppModule {}
