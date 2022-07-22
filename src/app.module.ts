import { Module }          from '@nestjs/common';
import { AppController }   from './app.controller';
import { TypeOrmModule }   from "@nestjs/typeorm";
import { DbConfig }        from "./db/db.config";
import * as Entities       from './db/entities/index'
import { AppConfigModule } from "./configs/app.config.module";
import { StudentModule }   from './student/student.module';
import { TeacherModule }   from './teacher/teacher.module';
import { ScheduleModule }  from './schedule/schedule.module';
import { ConfigModule }    from "@nestjs/config";
import { AppService }      from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [DbConfig],
      useFactory: async (dbconfig: DbConfig) => {
        const {
          database,
          password,
          username,
          port,
          host,
          logging,
          synchronize
        } = dbconfig
        return {
          type: 'postgres',
          database,
          password,
          username,
          port,
          host,
          logging,
          synchronize,
          entities: Object.values(Entities)
        }
      },
    }),
    StudentModule,
    TeacherModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
