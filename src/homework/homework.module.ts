import { Module } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Homework } from '../db/entities';
import { HomeworkRepository } from './repository/homework.repository';
import { DateScheduleModule } from '../dateSchedule/dateSchedule.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Homework, HomeworkRepository]),
    DateScheduleModule,
  ],
  controllers: [HomeworkController],
  providers: [HomeworkService],
  exports: [TypeOrmModule, HomeworkService],
})
export class HomeworkModule {}
