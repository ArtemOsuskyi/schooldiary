import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateSchedule }                                                  from './date_schedule.entity';

@Entity({ name: 'homework' })
export class Homework {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @ManyToOne(() => DateSchedule)
  @JoinColumn({ name: 'date_schedule_id', referencedColumnName: 'id' })
  date_schedule: DateSchedule;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @Column({ name: 'deadline', type: 'date' })
  deadline: Date;
}
