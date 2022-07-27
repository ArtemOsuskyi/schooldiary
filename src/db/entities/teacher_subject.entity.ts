import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from './teacher.entity';
import { Subject } from './subject.entity';

@Entity({ name: 'teacher_subject' })
export class TeacherSubject {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @ManyToOne(() => Teacher, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'teacher_id', referencedColumnName: 'id' })
  teacher: Teacher;

  @ManyToOne(() => Subject, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'subject_id', referencedColumnName: 'id' })
  subject: Subject;
}
