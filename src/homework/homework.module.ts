import { forwardRef, Module } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { HomeworkRepository } from './repository/homework.repository';
import { DateScheduleModule } from '../dateSchedule/dateSchedule.module';
import { TypeOrmExModule } from '../db/typeorm_ex.module';
import { JwtModule } from '@nestjs/jwt';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([HomeworkRepository]),
    forwardRef(() => StudentModule),
    DateScheduleModule,
    JwtModule,
  ],
  controllers: [HomeworkController],
  providers: [HomeworkService],
  exports: [HomeworkService],
})
export class HomeworkModule {}
