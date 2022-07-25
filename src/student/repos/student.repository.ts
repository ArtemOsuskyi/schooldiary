import { EntityRepository, Repository } from 'typeorm';
import { Student }                      from '../../db/entities';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student>{}