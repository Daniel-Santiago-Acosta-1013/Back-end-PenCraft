import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth.module'; // Asegúrate de que la ruta de importación sea correcta
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myusername',
      password: 'mypassword',
      database: 'digital-seller',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
