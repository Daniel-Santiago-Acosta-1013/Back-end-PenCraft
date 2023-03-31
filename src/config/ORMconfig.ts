import { User } from '../entities/user.entity';
import { Company } from '../entities/companies.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'myusername',
  password: 'mypassword',
  database: 'digital-seller',
  entities: [User, Company],
  synchronize: true,
};

export default ormconfig;
