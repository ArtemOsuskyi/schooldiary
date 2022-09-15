import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => Student, (student) => student.studyCourses, {
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinTable({
    name: 'study_course_student',
    joinColumn: {
      name: 'study_course_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
  })
  students: Student[];

  @ManyToOne(() => StudyClass, (studyClass) => studyClass.studyCourses, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  studyClass: StudyClass;

  @ManyToOne(() => StudyYear)
  @JoinColumn({ name: 'study_year_id', referencedColumnName: 'id' })
  studyYear: StudyYear;

  @OneToMany(() => Schedule, (schedule) => schedule.studyCourse)
  schedule: Schedule;

  @CreateDateColumn({ default: nowDate, select: false })
  createdAt: Date;

  @UpdateDateColumn({ default: nowDate, select: false })
  updatedAt: Date;
}
