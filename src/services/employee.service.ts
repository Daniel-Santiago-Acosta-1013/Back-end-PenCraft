import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmployeeSchema } from '../schemas/employee.schema';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from '../dto/employee.dto';
import { UpdateEmployeeDto } from '../dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee')
    private readonly employeeModel: Model<EmployeeSchema>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeSchema> {
    const employee = new this.employeeModel(createEmployeeDto);
    await employee.save();
    return employee;
  }

  async findAll(): Promise<EmployeeSchema[]> {
    return this.employeeModel.find().exec();
  }

  async findOne(id: string): Promise<EmployeeSchema> {
    return this.employeeModel.findById(id).exec();
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeSchema> {
    await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto).exec();
    return this.employeeModel.findById(id).exec();
  }

  async delete(id: string): Promise<EmployeeSchema> {
    return this.employeeModel.findByIdAndDelete(id).exec();
  }
}
