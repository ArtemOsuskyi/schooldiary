import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../enums/roles.enum';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'email', type: 'text' })
  email: string;

  @Column({ name: 'password', type: 'varchar', select: false })
  password: string;

  @Column({ name: 'role', type: 'enum', enum: Roles })
  role: Roles;

  @OneToOne(() => Student, ({ user }) => user, { nullable: true })
  student?: Student | null;

  @OneToOne(() => Teacher, ({ user }) => user, { nullable: true })
  teacher?: Teacher | null;
}
