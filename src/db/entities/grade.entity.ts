import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateSchedule } from './dateSchedule.entity';
import { GradeType } from '../enums/grade_type.enum';
import { Student } from './student.entity';
import { nowDate } from '../../constants';

//TODO: add not null constraints to all entities
@Entity({ name: 'grade' })
export class Grade {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'value', type: 'integer' })
  value: number;

  @ManyToOne(() => DateSchedule)
  @JoinColumn({ name: 'date_schedule_id', referencedColumnName: 'id' })
  dateSchedule: DateSchedule;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  @Column({ name: 'grade_type', type: 'enum', enum: GradeType })
  gradeType: GradeType;

  @CreateDateColumn({ default: nowDate, select: false })
  createdAt: Date;

  @UpdateDateColumn({ default: nowDate, select: false })
  updatedAt: Date;
}
