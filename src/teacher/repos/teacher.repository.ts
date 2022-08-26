import { ILike, In, Repository } from 'typeorm';
import { Teacher } from '../../db/entities';
import { CustomRepository } from '../../db/typeorm_ex.decorator';
import { isNil } from '@nestjs/common/utils/shared.utils';

@CustomRepository(Teacher)
export class TeacherRepository extends Repository<Teacher> {
  async getTeacherByUserId(userId: number) {
    return await this.findOne({
      where: {
        user: { id: userId },
      },
      relations: {
        subjects: true,
        user: true,
      },
    });
  }

  async searchTeacherByFilters(
    firstName?: string,
    lastName?: string,
    patronymic?: string,
    subjects?: string[],
  ): Promise<Teacher[]> {
    return await this.find({
      where: {
        ...(!isNil(firstName) && { firstName: ILike(firstName) }),
        ...(!isNil(lastName) && { lastName: ILike(lastName) }),
        ...(!isNil(patronymic) && { patronymic: ILike(patronymic) }),
        ...(!isNil(subjects) && {
          subjects: { name: In(subjects) },
        }),
      },
      relations: {
        subjects: true,
      },
    });
  }
}
