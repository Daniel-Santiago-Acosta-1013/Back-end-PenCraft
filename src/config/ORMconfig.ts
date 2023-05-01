import { User } from '../entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import globalEnvs from 'src/utils/globalEnvs';

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: globalEnvs.HOST,
  port: parseInt(globalEnvs.PORT, 10),
  username: globalEnvs.USERNAME,
  password: globalEnvs.PASSWORD,
  database: globalEnvs.DATABASE,
  entities: [User],
  synchronize: true,
};

export default ormconfig;
