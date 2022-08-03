import { EntityRepository, Repository } from 'typeorm';
import { StudyCourse } from '../../db/entities';

@EntityRepository(StudyCourse)
export class StudyCourseRepository extends Repository<StudyCourse> {}
