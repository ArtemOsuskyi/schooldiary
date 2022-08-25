import { forwardRef, Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { ScheduleRepository } from './repository/schedule.repository';
import { DateScheduleModule } from '../dateSchedule/dateSchedule.module';
import { StudyCourseModule } from '../studyCourse/studyCourse.module';
import { TypeOrmExModule } from '../db/typeorm_ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([ScheduleRepository]),
    forwardRef(() => DateScheduleModule),
    forwardRef(() => StudyCourseModule),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
