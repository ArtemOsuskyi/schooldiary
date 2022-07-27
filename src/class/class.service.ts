import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository }              from '@nestjs/typeorm';
import { StudyClass }       from '../db/entities';
import { Repository }       from 'typeorm';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(StudyClass)
    private readonly classRepository: Repository<StudyClass>
  ) {}

  async createClass(name: string): Promise<StudyClass> {
    return await this.classRepository.save({
      name
    })
  }

  async deleteClass(name: string): Promise<StudyClass> {
    const studyClass = await this.classRepository.findOne({name})
    if (!studyClass) throw new NotFoundException("This class doesn't exist")
    return await this.classRepository.remove(studyClass)
  }
}
