import { Repository } from 'typeorm';
import { Subject } from '../../db/entities';
import { CustomRepository } from '../../db/typeorm_ex.decorator';

@CustomRepository(Subject)
export class SubjectRepository extends Repository<Subject> {
  async getSubjectByName(name: string): Promise<Subject> {
    return await this.findOne({
      where: { name },
      relations: ['teachers'],
    });
  }
}
