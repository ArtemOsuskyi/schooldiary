// import {
//   CreateDateColumn,
//   Entity,
//   JoinColumn,
//   ManyToMany,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { Teacher } from './teacher.entity';
// import { Subject } from './subject.entity';
// import { nowDate } from '../../constants';
//
// @Entity({ name: 'teacher_subject' })
// export class TeacherSubject {
//   @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
//   id: number;
//
//   @ManyToMany()
//
//   // @ManyToOne(() => Teacher, {
//   //   onUpdate: 'CASCADE',
//   //   cascade: true,
//   // })
//   // @JoinColumn({ name: 'teacher_id', referencedColumnName: 'id' })
//   // teacher: Teacher;
//   //
//   // @ManyToOne(() => Subject, {
//   //   onUpdate: 'CASCADE',
//   //   cascade: true,
//   // })
//   // @JoinColumn({ name: 'subject_id', referencedColumnName: 'id' })
//   // subject: Subject;
//   @CreateDateColumn({ default: nowDate, select: false })
//   createdAt: Date;
//
//   @UpdateDateColumn({ default: nowDate, select: false })
//   updatedAt: Date;
// }
