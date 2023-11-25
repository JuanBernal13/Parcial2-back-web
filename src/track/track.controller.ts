/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackEntity } from './track.entity';
import { TrackDto } from './trackdto';
import { plainToInstance } from 'class-transformer';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll(): Promise<TrackEntity[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TrackEntity> {
    return this.trackService.findOne(id);
  }

  @Post(':albumId')
  async create(@Param('albumId') albumId: string, @Body() trackDto: TrackDto) {
    const trackData: TrackEntity = plainToInstance(TrackEntity, trackDto);
    return await this.trackService.create(albumId, trackData);
  }
}
