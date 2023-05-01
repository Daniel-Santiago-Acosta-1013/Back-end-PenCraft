import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must have at least 8 characters, one uppercase, one lowercase, one number and one special character',
  })
  password: string;
}