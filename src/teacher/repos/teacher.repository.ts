import { Repository } from 'typeorm';
import { Teacher } from '../../db/entities';
import { CustomRepository } from '../../db/typeorm_ex.decorator';

@CustomRepository(Teacher)
export class TeacherRepository extends Repository<Teacher> {
  async getTeacherByUserId(userId: number) {
    return await this.findOne({
      where: {
        user: { id: userId },
      },
      relations: ['subjects', 'user'],
    });
  }
}
