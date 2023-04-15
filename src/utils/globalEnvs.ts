import * as dotenv from 'dotenv';
dotenv.config();

const globalEnvs = {
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  DB_URI: process.env.DB_URI,
};
export default globalEnvs;
