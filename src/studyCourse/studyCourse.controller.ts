import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudyCourseService } from './studyCourse.service';
import { StudyCourse } from '../db/entities';
import { StudyCourseCreateBodyDto } from './dtos/studyCourse-create.dto';
import { StudyCourseRemoveStudentDto } from './dtos/studyCourse-removeStudent.dto';
import { StudyCourseSearchDto } from './dtos/studyCourse-search.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { ApprovedRoles } from '../auth/decorators/role-decorator';
import { Roles } from '../db/enums/roles.enum';

@ApiTags('studyCourse')
@Controller('studyCourse')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApprovedRoles(Roles.ADMIN)
export class StudyCourseController {
  constructor(private readonly studyCourseService: StudyCourseService) {}

  @Get('/all')
  async getAllStudyCourses(): Promise<StudyCourse[]> {
    return this.studyCourseService.getAllStudyCourses();
  }

  @Get(':studyCourseId')
  async getStudyCourse(
    @Param('studyCourseId') studyCourseId: number,
  ): Promise<StudyCourse> {
    return this.studyCourseService.getStudyCourseById(studyCourseId);
  }

  @Post('/create')
  async createStudyCourse(
    @Body() studyCourseCreateDto: StudyCourseCreateBodyDto,
  ): Promise<StudyCourse> {
    return this.studyCourseService.createStudyCourse(studyCourseCreateDto);
  }

  @Post('/search')
  async searchStudyCourse(@Body() studyCourseSearchDto: StudyCourseSearchDto) {
    return this.studyCourseService.searchStudyCourse(studyCourseSearchDto);
  }

  @Patch('remove-student-from-study-course')
  async removeStudentFromStudyCourse(
    @Body() studentRemoveDto: StudyCourseRemoveStudentDto,
  ) {
    const { studentId, studyCourseId } = studentRemoveDto;
    return await this.studyCourseService.removeStudentFromStudyCourse(
      studentId,
      studyCourseId,
    );
  }
}
