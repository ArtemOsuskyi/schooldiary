import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScheduleController } from './dateSchedule.controller';
import { DateScheduleService } from './dateSchedule.service';
import { DateSchedule } from '../db/entities';
import { DateScheduleRepository } from './repository/dateSchedule.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DateSchedule, DateScheduleRepository])],
  controllers: [DateScheduleController],
  providers: [DateScheduleService],
  exports: [TypeOrmModule, DateScheduleService],
})
export class DateScheduleModule {}
