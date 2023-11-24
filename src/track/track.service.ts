/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from '../album/album.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity';

@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(TrackEntity)
        private readonly trackRepository: Repository<TrackEntity>,
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ){}

    async findAll(): Promise<TrackEntity[]> {
        return await this.trackRepository.find();
    }

    async findOne(id: string): Promise<TrackEntity> {
        const track: TrackEntity = await this.trackRepository.findOne({where: {id}});
        if (!track)
          throw new BusinessLogicException("El track no fue encontrado", BusinessError.NOT_FOUND);
    
        return track;
    }
    
    async create(albumId: string, trackData: TrackEntity): Promise<TrackEntity> {
        const album = await this.albumRepository.findOne({where: {id: albumId}});
        if (!album) {
            throw new BusinessLogicException("El album a asociar no existe", BusinessError.NOT_FOUND);
        }

        if (trackData.duration <= 0) {
            throw new BusinessLogicException("Su duracion debe ser un numero positivo", BusinessError.PRECONDITION_FAILED);
        }

        const track = this.trackRepository.create({
            ...trackData,
            album 
        });

        return await this.trackRepository.save(track);
    }
}
