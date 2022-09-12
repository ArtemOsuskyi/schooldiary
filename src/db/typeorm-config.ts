import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import databaseConfig from './database-config';
import { ConfigModule, ConfigService } from '@nestjs/config';

// export const typeOrmConfig: TypeOrmModuleOptions = databaseConfig;

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return databaseConfig;
  },
};
