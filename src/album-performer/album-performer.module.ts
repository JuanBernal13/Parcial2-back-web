/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../album/album.entity';
import { PerformerEntity } from '../performer/performer.entity';
import { AlbumPerformersService } from './album-performer.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, PerformerEntity])],
  providers: [AlbumPerformersService],
})
export class AlbumPerformersModule {}
