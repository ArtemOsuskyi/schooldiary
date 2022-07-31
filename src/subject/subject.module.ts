import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '../db/entities';
import { SubjectRepository } from './repository/subject.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, SubjectRepository])],
  providers: [SubjectService],
  exports: [TypeOrmModule, SubjectService],
})
export class SubjectModule {}
