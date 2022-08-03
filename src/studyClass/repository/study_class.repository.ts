import { EntityRepository, Repository } from 'typeorm';
import { StudyClass } from '../../db/entities';

@EntityRepository(StudyClass)
export class StudyClassRepository extends Repository<StudyClass> {}
