import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CompanySchema } from '../schemas/company.schema';
import { Model } from 'mongoose';
import { CreateCompanyDto, UpdateCompanyDto } from '../dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company')
    private readonly companyModel: Model<CompanySchema>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<CompanySchema> {
    const company = new this.companyModel(createCompanyDto);
    await company.save();
    return company;
  }

  async findAll(): Promise<CompanySchema[]> {
    return this.companyModel.find().exec();
  }

  async findOne(id: string): Promise<CompanySchema> {
    return this.companyModel.findById(id).exec();
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanySchema> {
    await this.companyModel.findByIdAndUpdate(id, updateCompanyDto).exec();
    return this.companyModel.findById(id).exec();
  }

  async delete(id: string): Promise<CompanySchema> {
    return this.companyModel.findByIdAndDelete(id).exec();
  }
}
