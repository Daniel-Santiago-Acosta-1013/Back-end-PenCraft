import { User } from '../entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'myusername',
  password: 'mypassword',
  database: 'digital-seller',
  entities: [User],
  synchronize: true,
};

export default ormconfig;
