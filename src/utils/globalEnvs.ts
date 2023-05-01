import * as dotenv from 'dotenv';
dotenv.config();

const globalEnvs = {
  PORT: process.env.DB_PORT,
  HOST: process.env.DB_HOST,
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_DATABASE,
};
export default globalEnvs;
