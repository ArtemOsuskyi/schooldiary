import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudyClassCreateDto } from './dtos/studyClass-create.dto';
import { StudyClass } from '../db/entities';
import { StudyClassService } from './studyClass.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';

@ApiTags('studyClass')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('studyClass')
export class StudyClassController {
  constructor(private readonly studyClassService: StudyClassService) {}

  @Get('/getAll')
  async getAllStudyClasses(): Promise<StudyClass[]> {
    return this.studyClassService.getAllClasses();
  }

  @Get(':classId')
  async getStudyClass(@Param('classId') classId: number): Promise<StudyClass> {
    return this.studyClassService.getClassById(classId);
  }

  @Post('/create')
  async createStudyClass(
    @Body() studyClassCreateDto: StudyClassCreateDto,
  ): Promise<StudyClass> {
    return await this.studyClassService.createClass(studyClassCreateDto);
  }

  @Delete('/delete/:classId')
  async deleteStudyClass(
    @Param('classId') classId: number,
  ): Promise<StudyClass> {
    return await this.studyClassService.removeClass(classId);
  }
}
