/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    
  ],
  providers: [AlbumService],
  controllers: [],
  exports: [TypeOrmModule],
})
export class AlbumModule {}
