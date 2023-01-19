import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import * as Entities from './entities/index';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as process from 'process';

// export const typeOrmConfig: TypeOrmModuleOptions = databaseConfig;

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: Object.values(Entities),
      //synchronize: true,
      logging: true,
      migrations: [__dirname + '/src/db/migrations/*{.ts,.js}'],
    } as TypeOrmModuleAsyncOptions;
  },
};

export const teacherDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: 'teacher_user',
  password: 'teacher',
  database: process.env.DB_NAME,
  entities: Object.values(Entities),
});

export const studentDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: 'student_user',
  password: 'student',
  database: 'schooldiary',
  entities: Object.values(Entities),
});
