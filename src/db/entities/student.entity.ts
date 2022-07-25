import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'first_name', type: 'varchar' })
  first_name: string;

  @Column({ name: 'last_name', type: 'varchar' })
  last_name: string;

  @Column({ name: 'patronymic', type: 'varchar' })
  patronymic: string;

  @CreateDateColumn()
  createdAt: Date;
}
