import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'subject' })
export class Subject {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;
}
