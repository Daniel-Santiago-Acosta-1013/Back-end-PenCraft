import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyController } from '../controllers/company.controller';
import { CompanyService } from '../services/company.service';
import { CompanySchema } from '../schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
