import { Injectable }     from '@nestjs/common';
import { userRepository } from './user.repository';
import { User }           from '../db/entities';

@Injectable()
export class UserService {
  async findUserByEmail(email: string): Promise<User> {
    return userRepository.findByEmail(email);
  }

  async findUserById(id: number): Promise<User> {
    return userRepository.findOneById(id);
  }
}
