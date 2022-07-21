import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'class' })
export class StudyClass {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;
}
