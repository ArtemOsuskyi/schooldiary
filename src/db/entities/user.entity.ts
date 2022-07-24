import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles }                                  from '../enums/roles.enum';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'password', type: 'varchar', select: false })
  password: string;

  @Column({ name: 'role', type: 'enum', enum: Roles })
  role: Roles;
}