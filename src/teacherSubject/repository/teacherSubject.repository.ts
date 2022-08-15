import { EntityRepository, Repository } from 'typeorm';
import { TeacherSubject } from '../../db/entities';

@EntityRepository(TeacherSubject)
export class TeacherSubjectRepository extends Repository<TeacherSubject> {}
