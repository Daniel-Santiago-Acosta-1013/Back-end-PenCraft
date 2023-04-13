import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const regexEmail = /\S+@\S+\.\S+/;

    if (!regex.test(password)) {
      return {
        message:
          'Password must have at least 8 characters, one uppercase, one lowercase, one number and one special character',
      };
    }

    if (username.length < 4) {
      return {
        message: 'Username must have at least 4 characters',
      };
    }

    if (!regexEmail.test(username)) {
      return {
        message: 'Username must be a valid email',
      };
    }

    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
