import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<DocumentType<User>>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = new this.userModel();
    user.username = createUserDto.username;
    const salt = await bcrypt.genSalt(); // generate a salt
    user.password = await bcrypt.hash(createUserDto.password, salt); // hash the password with the salt
    await user.save();
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({
      username: loginUserDto.username,
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    ); // compare the provided password with the stored hash

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
