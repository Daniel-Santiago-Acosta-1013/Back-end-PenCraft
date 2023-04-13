import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './user.controller';
import { AuthService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('register', () => {
    it('should call authService.register with the provided user data', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser@example.com',
        password: 'Te$tP@ss123',
      };
      await authController.register(createUserDto);
      expect(authService.register).toHaveBeenCalledWith(createUserDto);
    });

    // Aquí puedes agregar más pruebas para verificar los mensajes de error según las condiciones dadas
  });

  describe('login', () => {
    it('should call authService.login with the provided user data', async () => {
      const loginUserDto: LoginUserDto = {
        username: 'testuser@example.com',
        password: 'Te$tP@ss123',
      };
      await authController.login(loginUserDto);
      expect(authService.login).toHaveBeenCalledWith(loginUserDto);
    });
  });
});
