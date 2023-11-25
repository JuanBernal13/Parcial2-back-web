/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ){}

    async findAll(): Promise<AlbumEntity[]> {
        return await this.albumRepository.find({ relations: ["tracks", "performers"] });
    }

    async findOne(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}, relations: ["tracks", "performers"] });
        if (!album)
          throw new BusinessLogicException("El album con el id dado, no fue encontrado", BusinessError.NOT_FOUND);
    
        return album;
    }
    
    async create(album: AlbumEntity): Promise<AlbumEntity> {
        if (!album.name || !album.description) {
            throw new BusinessLogicException("El nombre y descripcion no puede ser vacia", BusinessError.PRECONDITION_FAILED);
        }
        return await this.albumRepository.save(album);
    }

    async delete(id: string): Promise<void> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}, relations: ["tracks"]});
        
        if (!album) {
            throw new BusinessLogicException("El album con el id, no fue encontrado", BusinessError.NOT_FOUND);
        }
    
        if (  album.tracks.length > 0) {
            throw new BusinessLogicException("El album tiene tracks asociados, no puede ser eliminado", BusinessError.PRECONDITION_FAILED);
        }
      
        await this.albumRepository.remove(album);
    }
    
}

