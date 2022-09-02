import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NaService } from './na.service';
import { ApiTags } from '@nestjs/swagger';
import { NaCreateBodyDto } from './dtos/na-create.dto';
import { NA } from '../db/entities';
import { NaSearchDto } from './dtos/na-search.dto';
import { NaEditDto } from './dtos/na-edit.dto';
import { NaCountDto } from './dtos/na-count.dto';

@ApiTags('NA')
@Controller('na')
export class NaController {
  constructor(private readonly naService: NaService) {}

  @Get('/getAll')
  async getAllNAs(): Promise<NA[]> {
    return this.naService.getAllNAs();
  }

  @Get(':naId')
  async getNa(@Param('naId') naId: number): Promise<NA> {
    return this.naService.getNa(naId);
  }

  @Post('create')
  async createNa(@Body() naCreateDto: NaCreateBodyDto): Promise<NA> {
    return this.naService.createNa(naCreateDto);
  }

  @Patch('/edit/:naId')
  async editNa(
    @Param('naId') naId: number,
    @Body() naEditDto: NaEditDto,
  ): Promise<NA> {
    return this.naService.editNa(naId, naEditDto);
  }

  @Post('/countNa')
  async countNa(@Body() naCountDto: NaCountDto) {
    const { fromDate, toDate, studyClassId, studentId } = naCountDto;
    return this.naService.countNa(fromDate, toDate, studyClassId, studentId);
  }

  @Post('/search')
  async searchNa(@Body() naSearchDto: NaSearchDto): Promise<NA[]> {
    return this.naService.searchNa(naSearchDto);
  }

  @Delete('/delete/:naId')
  async deleteNa(@Param('naId') naId: number): Promise<NA> {
    return this.naService.deleteNa(naId);
  }
}
