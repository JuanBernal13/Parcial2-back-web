/* eslint-disable prettier/prettier */
// src/performer/performer.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformerEntity } from './performer.entity';
import { PerformerService } from './performer.service';
import { AlbumModule } from '../album/album.module'; 
import { PerformerController } from './performer.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PerformerEntity]),
    AlbumModule, 
  ],
  providers: [PerformerService],
  exports: [TypeOrmModule], 
  controllers: [PerformerController]
})
export class PerformerModule {}
