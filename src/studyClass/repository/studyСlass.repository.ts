import { Repository } from 'typeorm';
import { StudyClass } from '../../db/entities';
import { CustomRepository } from '../../db/typeorm_ex.decorator';

@CustomRepository(StudyClass)
export class StudyClassRepository extends Repository<StudyClass> {
  async getStudyClassByName(name: string): Promise<StudyClass[]> {
    return this.find({
      where: { name },
    });
  }
}
