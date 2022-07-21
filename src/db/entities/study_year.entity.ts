import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'study_year' })
export class StudyYear {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'start_date', type: 'date' })
  start_date: Date;

  @Column({ name: 'end_date', type: 'date' })
  end_date: Date;
}
