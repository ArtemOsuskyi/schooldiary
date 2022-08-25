import { Repository } from 'typeorm';
import { Homework } from '../../db/entities';
import { CustomRepository } from '../../db/typeorm_ex.decorator';

@CustomRepository(Homework)
export class HomeworkRepository extends Repository<Homework> {}
