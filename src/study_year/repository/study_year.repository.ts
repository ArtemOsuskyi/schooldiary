import { EntityRepository, Repository } from 'typeorm';
import { StudyYear }                    from '../../db/entities';

@EntityRepository(StudyYear)
export class StudyYearRepository extends Repository<StudyYear>{}