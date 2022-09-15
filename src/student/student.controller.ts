import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from '../db/entities';
import { StudentCreateBodyDto } from './dtos/student-create.dto';
import { ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentSearchDto } from './dtos/student-search.dto';
import { StudentEditDto } from './dtos/student-edit.dto';
import { ApprovedRoles } from '../auth/decorators/role-decorator';
import { Roles } from '../db/enums/roles.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';

@ApiTags('student')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApprovedRoles(Roles.ADMIN)
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

  @Post('/search')
  async searchStudents(
    @Body() studentSearchDto: StudentSearchDto,
  ): Promise<Student[]> {
    return this.studentService.searchStudents(studentSearchDto);
  }

  @Patch('/edit/:studentId')
  async editStudent(
    @Param('studentId') studentId: number,
    @Body() studentEditDto: StudentEditDto,
  ): Promise<Student> {
    return this.studentService.editStudent(studentId, studentEditDto);
  }

  @ApiExcludeEndpoint()
  @Post('create')
  // @ApiResponse({
  //   status: 201,
  //   description: 'Succesfull create',
  //   type: StudentCreateDto,
  // })
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
