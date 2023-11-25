/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PerformerService } from './performer.service';
import { PerformerEntity } from './performer.entity';
import { PerformerDto } from './performerdto'; 
import { plainToInstance } from 'class-transformer';

@Controller('performers')
export class PerformerController {
  constructor(private readonly performerService: PerformerService) {}

  @Get()
  async findAll(): Promise<PerformerEntity[]> {
    return this.performerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PerformerEntity> {
    return this.performerService.findOne(id);
  }

  @Post()
  async create(@Body() performerDto: PerformerDto) {
    const performer: PerformerEntity = plainToInstance(PerformerEntity, performerDto);
    return await this.performerService.create(performer);
  }
}
