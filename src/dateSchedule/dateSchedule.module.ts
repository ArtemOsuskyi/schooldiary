import { Module } from '@nestjs/common';
import { DateScheduleController } from './dateSchedule.controller';
import { DateScheduleService } from './dateSchedule.service';
import { DateScheduleRepository } from './repository/dateSchedule.repository';
import { ScheduleModule } from '../schedule/schedule.module';
import { TypeOrmExModule } from '../db/typeorm_ex.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([DateScheduleRepository]),
    ScheduleModule,
    JwtModule,
  ],
  controllers: [DateScheduleController],
  providers: [DateScheduleService],
  exports: [DateScheduleService],
})
export class DateScheduleModule {}
