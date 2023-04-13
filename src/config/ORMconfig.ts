import * as dotenv from 'dotenv';
dotenv.config();

const mongooseConfig = process.env.DB_URI;

export default mongooseConfig;
