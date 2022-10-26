import { DataSource } from 'typeorm';
import environmentConfig from './src/config';

export default new DataSource({
  type: 'mysql',
  host: environmentConfig.DATABASE_CONFIG.HOST,
  port: parseInt(environmentConfig.DATABASE_CONFIG.PORT),
  username: environmentConfig.DATABASE_CONFIG.USER,
  password: environmentConfig.DATABASE_CONFIG.PASSWORD,
  database: environmentConfig.DATABASE_CONFIG.NAME,
  entities: ['./src/**/*.entity{.ts,.js}'],
  migrations: ['./src/migrations/*.ts'],
});
