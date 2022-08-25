import { Repository } from 'typeorm';
import { User } from '../../db/entities';
import { CustomRepository } from '../../db/typeorm_ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
