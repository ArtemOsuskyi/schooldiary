import { EntityRepository, Repository } from 'typeorm';
import { Schedule } from '../../db/entities';

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {}
