import { Repository } from 'typeorm';
import { Schedule } from '../../db/entities';
import { CustomRepository } from '../../db/typeorm_ex.decorator';

@CustomRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {}
