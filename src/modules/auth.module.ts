import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from '../schemas/user.schema';
import { AuthService } from '../services/user.service';
import { AuthController } from '../controllers/user.controller';
import * as dotenv from 'dotenv';
import globalEnvs from 'src/utils/globalEnvs';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: globalEnvs.JWT_SECRET, // Reemplaza esto con una clave secreta real
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
