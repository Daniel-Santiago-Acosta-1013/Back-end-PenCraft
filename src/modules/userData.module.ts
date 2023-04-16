import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDataController } from '../controllers/userData.controller';
import { UserDataService } from '../services/userData.service';
import { UserDataSchema } from '../schemas/userData.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserDataSchema }]),
  ],
  controllers: [UserDataController],
  providers: [UserDataService],
})
export class UserDataModule {}
