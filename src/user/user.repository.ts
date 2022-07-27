import { EntityRepository, Repository } from 'typeorm';
import { User } from '../db/entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
