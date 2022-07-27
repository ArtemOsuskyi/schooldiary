import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { DateSchedule } from './date_schedule.entity';

@Entity({ name: 'NA' }) //NA - Not Attended
export class NA {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @ManyToOne(() => Student, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  @ManyToOne(() => DateSchedule, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'date_schedule_id', referencedColumnName: 'id' })
  date_schedule: DateSchedule;

  @Column({ name: 'reason', type: 'varchar' })
  reason: string;
}
