import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = new this.userModel();
    user.username = createUserDto.username;
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(createUserDto.password, salt);
    await user.save();
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    console.log('Login attempt:', loginUserDto); // Log the incoming data
    const user = await this.userModel.findOne({
      username: loginUserDto.username,
    });
  
    if (!user) {
      console.log('User not found:', loginUserDto.username); // Log if the user is not found
      throw new Error('Invalid credentials');
    }
  
    const passwordMatch = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
  
    if (!passwordMatch) {
      console.log('Password mismatch:', loginUserDto.password, user.password); // Log if the password does not match
      throw new Error('Invalid credentials');
    }
  
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    console.log('Login success:', payload); // Log the successful login
    return { token };
  }
  
}
