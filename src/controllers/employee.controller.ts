import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { CreateEmployeeDto } from '../dto/employee.dto';
import { UpdateEmployeeDto } from '../dto/employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  async findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.employeeService.delete(id);
  }
}
