import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { StudyClass } from './study_class.entity';
import { StudyYear } from './study_year.entity';
import { Schedule } from './schedule.entity';

@Entity({ name: 'study_course' })
export class StudyCourse {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @ManyToOne(() => Student, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  @ManyToOne(() => StudyClass)
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  class: StudyClass;

  @ManyToOne(() => StudyYear)
  @JoinColumn({ name: 'study_year_id', referencedColumnName: 'id' })
  study_year: StudyYear;

  @OneToMany(() => Schedule, (schedule) => schedule.study_course)
  schedule: Schedule;
}
