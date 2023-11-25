/* eslint-disable prettier/prettier */
import { Controller, Post, Param } from '@nestjs/common';
import { AlbumPerformersService } from './album-performer.service';

@Controller('albums/:albumId/performers')
export class AlbumPerformerController {
  constructor(private readonly albumPerformersService: AlbumPerformersService) {}

  @Post(':performerId')
  async addPerformerToAlbum(@Param('albumId') albumId: string, @Param('performerId') performerId: string) {
    
      const updatedAlbum = await this.albumPerformersService.addPerformerToAlbum(albumId, performerId);
      return updatedAlbum;
    
      
    
  }
}
