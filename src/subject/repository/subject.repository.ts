import { EntityRepository, Repository } from 'typeorm';
import { Subject } from '../../db/entities';

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> {}
