import { DataSource } from 'typeorm';
import databaseConfig from './database-config';

export const dataSource = new DataSource(databaseConfig);
