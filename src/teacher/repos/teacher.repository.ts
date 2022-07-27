import { EntityRepository, Repository } from 'typeorm';
import { Teacher } from '../../db/entities';

@EntityRepository(Teacher)
export class TeacherRepository extends Repository<Teacher> {}
