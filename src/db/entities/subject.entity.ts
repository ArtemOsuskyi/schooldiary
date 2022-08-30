import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { nowDate } from '../../constants';
import { Teacher } from './teacher.entity';

@Entity({ name: 'subject' })
export class Subject {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false, unique: true })
  name: string;

  @ManyToMany(() => Teacher, (teacher) => teacher.subjects, {
    onUpdate: 'CASCADE',
  })
  teachers: Teacher[];

  @CreateDateColumn({ default: nowDate, select: false })
  createdAt: Date;

  @UpdateDateColumn({ default: nowDate, select: false })
  updatedAt: Date;
}
