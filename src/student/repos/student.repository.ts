import { EntityRepository, Repository } from 'typeorm';
import { Student } from '../../db/entities';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  async getStudentByUserId(userId: number): Promise<Student> {
    return await this.findOne({
      where: {
        user: { id: userId },
      },
      relations: ['user'],
    });
  }
}
