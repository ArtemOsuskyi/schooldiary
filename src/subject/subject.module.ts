import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '../db/entities';
import { SubjectRepository } from './repository/subject.repository';
import { SubjectController } from './subject.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, SubjectRepository])],
  providers: [SubjectService],
  exports: [TypeOrmModule, SubjectService],
  controllers: [SubjectController],
})
export class SubjectModule {}
