import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { StudyClass } from './studyClass.entity';
import { StudyYear } from './studyYear.entity';
import { Schedule } from './schedule.entity';
import { nowDate } from '../../constants';

@Entity({ name: 'study_course' })
export class StudyCourse {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @ManyToOne(() => Student, (student) => student.studyCourses, {
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  students: Student[];

  @ManyToOne(() => StudyClass, (studyClass) => studyClass.studyCourses, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  class: StudyClass;

  @ManyToOne(() => StudyYear)
  @JoinColumn({ name: 'study_year_id', referencedColumnName: 'id' })
  studyYear: StudyYear;

  @OneToMany(() => Schedule, (schedule) => schedule.study_course)
  schedule: Schedule;

  @CreateDateColumn({ default: nowDate, select: false })
  createdAt: Date;

  @UpdateDateColumn({ default: nowDate, select: false })
  updatedAt: Date;
}
