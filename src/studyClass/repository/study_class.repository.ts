import { EntityRepository, Repository } from 'typeorm';
import { StudyClass } from '../../db/entities';

@EntityRepository(StudyClass)
export class StudyClassRepository extends Repository<StudyClass> {
  async getStudyClassByName(name: string): Promise<StudyClass[]> {
    return this.find({
      where: { name },
    });
  }
}
