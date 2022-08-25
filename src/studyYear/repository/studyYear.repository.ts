import { Repository } from 'typeorm';
import { StudyYear } from '../../db/entities';
import { CustomRepository } from '../../db/typeorm_ex.decorator';

@CustomRepository(StudyYear)
export class StudyYearRepository extends Repository<StudyYear> {}
