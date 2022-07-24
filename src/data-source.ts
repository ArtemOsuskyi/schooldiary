import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as Entities  from 'src/db/entities/index';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: Object.values(Entities),
  synchronize: true,
  logging: true,
});
