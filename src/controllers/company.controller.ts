import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDto, UpdateCompanyDto } from '../dto/company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  async findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.companyService.delete(id);
  }
}
