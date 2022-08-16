import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from '../db/entities';
import {
  StudentCreateBodyDto,
  StudentCreateDto,
} from './dtos/student-create-dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentSearchByFullNameDto } from './dtos/student-searchByFullName.dto';

@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/all')
  async getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Get(':studentId')
  @ApiResponse({
    status: 200,
    description: 'Student found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Student not found',
  })
  async getStudent(@Param('studentId') studentId: number): Promise<Student> {
    return this.studentService.getStudent(studentId);
  }

  @Get('/search/byClassId/:classId')
  async getStudentsByClassId(
    @Param('classId') classId: number,
  ): Promise<Student[]> {
    return this.studentService.getStudentsByClass(classId);
  }

  @Post('/search/byFullName')
  async getStudentsByFullName(
    @Body() studentSearchDto: StudentSearchByFullNameDto,
  ): Promise<Student[]> {
    return this.studentService.getStudentsByFullName(studentSearchDto);
  }

  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'Succesfull create',
    type: StudentCreateDto,
  })
  async createStudent(
    @Body() createStudentDto: StudentCreateBodyDto,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentDto);
  }

  @Delete('delete/:studentId')
  async deleteStudent(@Param('studentId') studentId: number): Promise<void> {
    return this.studentService.deleteStudent(studentId);
  }
}
