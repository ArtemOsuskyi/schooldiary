import { EntityRepository, Repository } from 'typeorm';
import { Subject } from '../../db/entities';

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> {
  async getSubjectByName(name: string): Promise<Subject> {
    return await this.findOne({
      where: { name },
      relations: ['teachers'],
    });
  }
}
