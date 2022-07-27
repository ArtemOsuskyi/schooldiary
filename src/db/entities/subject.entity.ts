import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TeacherSubject } from './teacher_subject.entity';

@Entity({ name: 'subject' })
export class Subject {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => TeacherSubject, (teacherSubject) => teacherSubject.subject, {
    cascade: true,
  })
  teacher_subject: TeacherSubject;
}
