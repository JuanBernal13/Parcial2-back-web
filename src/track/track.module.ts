/* eslint-disable prettier/prettier */
// src/track/track.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';
import { AlbumModule } from '../album/album.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackEntity]),
    AlbumModule, 
  ],
  providers: [TrackService],
  exports: [TypeOrmModule], 

})
export class TrackModule {}
