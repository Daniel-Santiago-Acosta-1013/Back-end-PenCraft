import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/entities/companies.entity';
import { CompaniesDto } from 'src/dto/companies.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  findOne(id: string): Promise<Company> {
    return this.companyRepository.findOne({ where: { id: id } });
  }

  async create(companyDto: CompaniesDto): Promise<Company> {
    const company = new Company();
    company.name_company = companyDto.name_company;

    await this.companyRepository.save(company);
    return company;
  }

  async update(id: string, companyDto: CompaniesDto): Promise<any> {
    await this.companyRepository.update(id, companyDto);
    return this.companyRepository.findOne({ where: { id: id } });
  }

  async delete(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
