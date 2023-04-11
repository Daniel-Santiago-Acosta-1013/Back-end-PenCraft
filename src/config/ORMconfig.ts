import * as dotenv from 'dotenv';
dotenv.config();

const mongooseConfig = process.env.DB_URI;
console.log('mongooseConfig', mongooseConfig);
console.log('hola: ', process.env);

export default mongooseConfig;
