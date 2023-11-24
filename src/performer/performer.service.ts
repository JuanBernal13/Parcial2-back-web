/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformerEntity } from './performer.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class PerformerService {
    constructor(
        @InjectRepository(PerformerEntity)
        private readonly performerRepository: Repository<PerformerEntity>
    ){}

    async findAll(): Promise<PerformerEntity[]> {
        return await this.performerRepository.find();
    }

    async findOne(id: string): Promise<PerformerEntity> {
        const performer: PerformerEntity = await this.performerRepository.findOne({where: {id}});
        if (!performer) {
            throw new BusinessLogicException("El performer no fue encontado", BusinessError.NOT_FOUND);
        }
        return performer;
    }
    
    async create(performer: PerformerEntity): Promise<PerformerEntity> {
        if (performer.description && performer.description.length > 100) {
            throw new BusinessLogicException("La descripcion deben ser 100 caracteres o menos", BusinessError.PRECONDITION_FAILED);
        }
        return await this.performerRepository.save(performer);
    }
}
