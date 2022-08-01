import { EntityRepository, Repository } from 'typeorm';
import { Homework } from '../../db/entities';

@EntityRepository(Homework)
export class HomeworkRepository extends Repository<Homework> {}
