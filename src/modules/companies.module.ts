import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/entities/companies.entity';
import { CompaniesController } from 'src/controller/companies.controller';
import { CompaniesService } from 'src/services/companies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompanyModule {}
