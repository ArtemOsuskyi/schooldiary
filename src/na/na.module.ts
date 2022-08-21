import { forwardRef, Module } from '@nestjs/common';
import { NaService } from './na.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NaRepository } from './repository/na.repository';
import { NA } from '../db/entities';
import { NaController } from './na.controller';
import { StudentModule } from '../student/student.module';
import { DateScheduleModule } from '../dateSchedule/dateSchedule.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NA, NaRepository]),
    forwardRef(() => StudentModule),
    DateScheduleModule,
  ],
  controllers: [NaController],
  providers: [NaService],
  exports: [TypeOrmModule, NaService],
})
export class NaModule {}
