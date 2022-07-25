import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Schedule }                                                      from './schedule.entity';

@Entity({ name: 'date_schedule' })
export class DateSchedule {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @ManyToOne(() => Schedule)
  @JoinColumn({ name: 'schedule_id', referencedColumnName: 'id' })
  schedule: Schedule;

  @Column({ name: 'date', type: 'date' })
  date: Date;
}
