import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { StudyClass } from '../db/entities';
import { StudyClassRepository } from './repository/studyСlass.repository';
import { StudyClassCreateDto } from './dtos/studyClass-create.dto';

@Injectable()
export class StudyClassService {
  constructor(private readonly classRepository: StudyClassRepository) {}

  async createClass(
    studyClassCreateDto: StudyClassCreateDto,
  ): Promise<StudyClass> {
    const { name } = studyClassCreateDto;
    if (await this.classNameExists(name))
      throw new BadRequestException('Class with this name already exists');
    return await this.classRepository.save({
      name,
    });
  }

  private async classNameExists(className: string): Promise<boolean> {
    const studyClass = await this.classRepository.findOne({
      where: {
        name: className,
      },
    });
    return !isNil(studyClass);
  }

  async getAllClasses(): Promise<StudyClass[]> {
    return this.classRepository.find({
      relations: {
        studyCourses: {
          studyYear: true,
        },
      },
    });
  }

  async getClassById(classId: number): Promise<StudyClass> {
    const studyClass = await this.classRepository.findOne({
      where: { id: classId },
      relations: {
        studyCourses: {
          students: true,
        },
      },
    });
    if (isNil(studyClass)) throw new NotFoundException('Class not found');
    return studyClass;
  }

  async removeClass(classId: number): Promise<StudyClass> {
    const studyClass = await this.classRepository.findOne({
      where: { id: classId },
    });
    if (!studyClass) throw new NotFoundException("This class doesn't exist");
    return await this.classRepository.remove(studyClass);
  }
}
