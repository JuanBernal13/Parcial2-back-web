/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from '../album/album.entity';
import { PerformerEntity } from '../performer/performer.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class AlbumPerformersService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
        @InjectRepository(PerformerEntity)
        private readonly performerRepository: Repository<PerformerEntity>
    ){}

    async addPerformerToAlbum(albumId: string, performerId: string): Promise<AlbumEntity> {
        const album = await this.albumRepository.findOne({where: {id: albumId}, relations: ['performers']});
        if (!album) {
            throw new BusinessLogicException("El album con el id dado no fue encontado", BusinessError.NOT_FOUND);
        }

        if (album.performers && album.performers.length >= 3) {
            throw new BusinessLogicException("Un album no puede tener mas de 3 performers asociados", BusinessError.PRECONDITION_FAILED);
        }

        const performer = await this.performerRepository.findOne({where: {id: performerId}});
        if (!performer) {
            throw new BusinessLogicException("El performer con el id dado no fue encontrado", BusinessError.NOT_FOUND);
        }

        const isAlreadyAdded = album.performers.some(p => p.id === performer.id);
        if (isAlreadyAdded) {
            throw new BusinessLogicException("Ya fue agregado el performer", BusinessError.PRECONDITION_FAILED);
        }

        album.performers.push(performer);
        
        return await this.albumRepository.save(album);
    }
}


 