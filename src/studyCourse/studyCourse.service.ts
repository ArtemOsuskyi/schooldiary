import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student, StudyCourse } from '../db/entities';
import { StudyCourseRepository } from './repository/studyCourse.repository';
import { StudentService } from '../student/student.service';
import { StudyClassService } from '../studyClass/studyClass.service';
import { StudyYearService } from '../studyYear/studyYear.service';
import { StudentRepository } from '../student/repos/student.repository';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { StudyCourseCreateBodyDto } from './dtos/studyCourse-create.dto';
import { StudyCourseSearchDto } from './dtos/studyCourse-search.dto';

@Injectable()
export class StudyCourseService {
  constructor(
    private readonly studyCourseRepository: StudyCourseRepository,
    private readonly studentRepository: StudentRepository,
    @Inject(forwardRef(() => StudentService))
    private readonly studentService: StudentService,
    private readonly studyClassService: StudyClassService,
    private readonly studyYearService: StudyYearService,
  ) {}

  async createStudyCourse(
    createStudyCourseDto: StudyCourseCreateBodyDto,
  ): Promise<StudyCourse> {
    const { classId, studyYearId } = createStudyCourseDto;
    //const student = await this.studentService.getStudent(studentId);
    const studyClass = await this.studyClassService.getClassById(classId);
    const studyYear = await this.studyYearService.getStudyYear(studyYearId);
    return await this.studyCourseRepository.save({
      studyClass: studyClass,
      studyYear,
    });
  }

  async getAllStudyCourses(): Promise<StudyCourse[]> {
    return this.studyCourseRepository.find({
      relations: ['students'],
    });
  }

  async getStudyCourseById(studyCourseId: number): Promise<StudyCourse> {
    // return await this.studyCourseRepository
    //   .createQueryBuilder('studyCourse')
    //   .where(`studyCourse.id = ${studyCourseId}`)
    //   .leftJoinAndSelect('studyCourse.students', 'students')
    //   .getOne();
    const studyCourse = await this.studyCourseRepository.findOne(
      studyCourseId,
      {
        relations: ['students', 'studyClass', 'studyYear'],
      },
    );
    if (isNil(studyCourse)) throw new NotFoundException();
    return studyCourse;
  }

  async getStudyCourseForStudent(
    studyYearId: number,
    classId: number,
  ): Promise<StudyCourse> {
    const studyCourse = await this.studyCourseRepository.findOne({
      where: {
        studyYear: { id: studyYearId },
        studyClass: { id: classId },
      },
    });
    if (isNil(studyCourse))
      throw new NotFoundException('Such study course not found');
    return studyCourse;
  }

  async searchStudyCourse(studyCourseSearchDto: StudyCourseSearchDto) {
    const { studentId, studyYearId, classId } = studyCourseSearchDto;
    return await this.studyCourseRepository.getStudyCoursesByFilters(
      studentId,
      studyYearId,
      classId,
    );
  }

  async removeStudentFromStudyCourse(studentId: number, studyCourseId: number) {
    const studyCourse = await this.studyCourseRepository.findOne(
      studyCourseId,
      {
        relations: ['students'],
      },
    );
    studyCourse.students = studyCourse.students.filter(
      (student) => student.id !== studentId,
    );
    return await this.studyCourseRepository.save(studyCourse);
  }

  async assignStudyCourseToStudent(
    studyCourseId: number,
    studentId: number,
  ): Promise<StudyCourse> {
    const student = await this.studentService.getStudent(studentId);
    const studyCoursesToUpdate = student.studyCourses;
    const studyCourse = await this.getStudyCourseById(studyCourseId);
    studyCoursesToUpdate.push(studyCourse);
    student.studyCourses = studyCoursesToUpdate;
    await this.studentRepository.save(student);
    return studyCourse;
  }
}
