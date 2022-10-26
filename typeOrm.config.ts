import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import environmentConfig from './src/config';
import { MainSeeder } from './src/seeds/MainSeeder';

const option: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: environmentConfig.DATABASE_CONFIG.HOST,
  port: parseInt(environmentConfig.DATABASE_CONFIG.PORT),
  username: environmentConfig.DATABASE_CONFIG.USER,
  password: environmentConfig.DATABASE_CONFIG.PASSWORD,
  database: environmentConfig.DATABASE_CONFIG.NAME,
  entities: ['./src/**/*.entity{.ts,.js}'],
  migrations: ['./src/migrations/*.ts'],
  seeds: [MainSeeder],
};

export default new DataSource(option);
