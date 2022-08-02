import { EntityRepository, Repository } from 'typeorm';
import { Teacher } from '../../db/entities';

@EntityRepository(Teacher)
export class TeacherRepository extends Repository<Teacher> {
  async getTeacherByUserId(userId: number) {
    return await this.findOne({
      where: {
        user: { id: userId },
      },
      relations: ['teacher_subjects', 'user'],
    });
  }
}
