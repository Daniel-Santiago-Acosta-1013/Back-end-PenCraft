import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  HttpCode,
} from '@nestjs/common';
import { CompaniesDto } from 'src/dto/companies.dto';
import { CompaniesService } from '../services/companies.service';
import { Company } from 'src/entities/companies.entity';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  findAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companiesService.findOne(id);
  }

  @Post()
  async create(@Body() companyDto: CompaniesDto): Promise<Company> {
    return await this.companiesService.create(companyDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() companyDto: CompaniesDto,
  ): Promise<any> {
    return await this.companiesService.update(id, companyDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<void> {
    return await this.companiesService.delete(id);
  }
}
