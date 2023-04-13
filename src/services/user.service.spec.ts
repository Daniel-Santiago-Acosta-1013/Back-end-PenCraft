import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './user.service';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: any;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken('User'),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get(getModelToken('User'));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user and return it', async () => {
      const createUserDto: CreateUserDto = {
        username: 'test@example.com',
        password: 'testPassword1!',
      };

      const user: Partial<User> = {
        _id: '1',
        username: createUserDto.username,
        password: 'hashedPassword',
      };

      userModel.prototype.save = jest.fn().mockResolvedValue(user);
      bcrypt.genSalt.mockResolvedValue('salt');
      bcrypt.hash.mockResolvedValue('hashedPassword');

      const result = await authService.register(createUserDto);
      expect(result).toEqual(user);
      expect(bcrypt.genSalt).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 'salt');
    });
  });

  describe('login', () => {
    it('should log in a user and return a token', async () => {
      const loginUserDto: LoginUserDto = {
        username: 'test@example.com',
        password: 'testPassword1!',
      };

      const user: Partial<User> = {
        _id: '1',
        username: loginUserDto.username,
        password: 'hashedPassword',
      };

      userModel.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwtService.sign = jest.fn().mockImplementation(() => 'testToken');

      const result = await authService.login(loginUserDto);
      expect(result).toEqual({ token: 'testToken' });
      expect(userModel.findOne).toHaveBeenCalledWith({
        username: loginUserDto.username,
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginUserDto.password,
        user.password,
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: user.username,
        sub: user._id,
      });
    });

    it('should throw an error when user is not found', async () => {
      userModel.findOne.mockResolvedValue(null);

      await expect(authService.login({} as any)).rejects.toThrowError(
        'Invalid credentials',
      );
    });

    it('should throw an error when password does not match', async () => {
      userModel.findOne.mockResolvedValue({} as any);
      bcrypt.compare.mockResolvedValue(false);

      await expect(authService.login({} as any)).rejects.toThrowError(
        'Invalid credentials',
      );
    });
  });
});
