import { Controller, Get, Param } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { SubjectService } from './subject.service';
import { Subject } from '../db/entities';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @ApiExcludeEndpoint()
  @Get(':subjectId')
  async getSubject(@Param('subjectId') subjectId: number): Promise<Subject> {
    return this.subjectService.getSubject(subjectId);
  }
}
