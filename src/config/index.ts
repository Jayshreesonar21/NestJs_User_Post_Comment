import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({ envFilePath: '.env' });

const environmentConfig = Object.freeze({
  DATABASE_CONFIG: {
    PORT: process.env.DB_PORT,
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRESIN: process.env.JWT_EXPIRESIN,
  },
  BCRYPT: {
    SALT: process.env.BCRYPT_SALT,
  },
});
export default environmentConfig;
