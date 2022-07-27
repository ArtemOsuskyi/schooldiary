import { Module }           from '@nestjs/common';
import { StudyYearService } from './study_year.service';
import { TypeOrmModule }    from '@nestjs/typeorm';
import { StudyYear }        from '../db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([StudyYear])],
  providers: [StudyYearService]
})
export class StudyYearModule {}
