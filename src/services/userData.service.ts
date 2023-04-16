import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserData } from '../schemas/userData.schema';
import { Model } from 'mongoose';
import { CreateUserDataDto } from '../dto/create-user-data.dto';
import { UpdateUserDataDto } from '../dto/update-user-data.dto';

@Injectable()
export class UserDataService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserData>,
  ) {}

  async create(createUserDto: CreateUserDataDto): Promise<UserData> {
    const user = new this.userModel(createUserDto);
    await user.save();
    return user;
  }

  async findAll(): Promise<UserData[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserData> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDataDto): Promise<UserData> {
    await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
    return this.userModel.findById(id).exec();
  }

  async delete(id: string): Promise<UserData> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}