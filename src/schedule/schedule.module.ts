import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { ScheduleRepository } from './repository/schedule.repository';
import { DateScheduleModule } from '../dateSchedule/dateSchedule.module';
import { StudyCourseModule } from '../studyCourse/studyCourse.module';
import { Schedule } from '../db/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, ScheduleRepository]),
    forwardRef(() => DateScheduleModule),
    forwardRef(() => StudyCourseModule),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [TypeOrmModule, ScheduleService],
})
export class ScheduleModule {}
