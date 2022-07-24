import { dataSource } from '../data-source';
import { User }       from '../db/entities';

export const userRepository = dataSource.getRepository(User).extend({
  findByEmail(email: string) {
    return userRepository.findOneBy({ email });
  },
});