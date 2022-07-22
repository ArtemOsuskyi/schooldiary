import { Module }         from "@nestjs/common";
import { AppController }  from "./app.controller";
import { TypeOrmModule }  from "@nestjs/typeorm";
import { StudentModule }  from "./student/student.module";
import { TeacherModule }  from "./teacher/teacher.module";
import { ScheduleModule } from "./schedule/schedule.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppService }                    from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        logging: true,
        synchronize: true
      }),
    }),
    StudentModule,
    TeacherModule,
    ScheduleModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
