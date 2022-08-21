import { Body, Controller, Post } from '@nestjs/common';
import { NaService } from './na.service';
import { ApiTags } from '@nestjs/swagger';
import { NaCreateBodyDto } from './dtos/na-create.dto';
import { NA } from '../db/entities';

@ApiTags('NA')
@Controller('na')
export class NaController {
  constructor(private readonly naService: NaService) {}

  @Post('create')
  async createNa(@Body() naCreateDto: NaCreateBodyDto): Promise<NA> {
    return this.naService.createNa(naCreateDto);
  }
}
