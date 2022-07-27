import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateSchedule } from './date_schedule.entity';
import { GradeType } from '../enums/grade_type.enum';
import { Student } from './student.entity';

//TODO: add not null constraints to all entities
@Entity({ name: 'grade' })
export class Grade {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'value', type: 'integer' })
  value: number;

  @ManyToOne(() => DateSchedule)
  @JoinColumn({ name: 'date_schedule_id', referencedColumnName: 'id' })
  date_schedule: DateSchedule;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  @Column({ name: 'grade_type', type: 'enum', enum: GradeType })
  grade_type: GradeType;
}
