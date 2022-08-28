import { ILike, Repository } from 'typeorm';
import { Subject } from '../../db/entities';
import { CustomRepository } from '../../db/typeorm_ex.decorator';
import { isNil } from '@nestjs/common/utils/shared.utils';

@CustomRepository(Subject)
export class SubjectRepository extends Repository<Subject> {
  async getSubjectByName(name: string): Promise<Subject> {
    return await this.findOne({
      where: { name },
      relations: {
        teachers: true,
      },
    });
  }

  async searchSubject(subjectName?: string, teacherId?: number) {
    return await this.find({
      where: {
        ...(!isNil(subjectName) && { name: ILike(subjectName) }),
        ...(!isNil(teacherId) && { teachers: { id: teacherId } }),
      },
      relations: {
        teachers: true,
      },
    });
  }
}
