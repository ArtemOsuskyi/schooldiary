import * as Entities from './src/db/entities';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  name: 'Admin',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: Object.values(Entities),
  synchronize: true,
  migrations: ['src/db/migrations/*.ts'],
  logging: true,
  migrationsRun: true,
} as DataSourceOptions);

// const databaseConfig: DataSourceOptions = {
//   type: 'postgres',
//   database: process.env.DB_NAME,
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT),
//   name: 'Admin',
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   entities: Object.values(Entities),
//   synchronize: true,
//   migrations: ['db/migrations/*.ts'],
//   logging: true,
// };
//
// export default databaseConfig;
//
// export const teacherConn = new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT),
//   name: 'Teacher',
//   username: process.env.DB_TEACHER_USERNAME,
//   password: process.env.DB_TEACHER_PASSWORD,
//   database: process.env.DB_NAME,
//   entities: Object.values(Entities),
//   synchronize: false,
//   migrations: ['db/migrations/*.ts'],
//   logging: true,
// });
