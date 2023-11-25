/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PerformerEntity } from './performer.entity';
import { PerformerService } from './performer.service';

import { faker } from '@faker-js/faker';

describe('PerformerService', () => {
  let service: PerformerService;
  let repository: Repository<PerformerEntity>;
  let performerList: PerformerEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PerformerService],
    }).compile();

    service = module.get<PerformerService>(PerformerService);
    repository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    performerList = [];
    for (let i = 0; i < 5; i++) {
      const performer: PerformerEntity = await repository.save({
        name: faker.lorem.sentence(),
        image: faker.image.url(),
        description: faker.lorem.paragraph(),
        albums: []
      });
      performerList.push(performer);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Retornar findAll de los performers', async () => {
    const performers = await service.findAll();
    expect(performers.length).toEqual(5);
  });

  it('Retornar findAll de los performers con una base de datos vacía', async () => {
    await repository.clear();
    const performers = await service.findAll();
  
    expect(performers.length).toEqual(0);
  });
  describe('PerformerService', () => {
  
    it('FindOne de algún performer', async () => {
      const storedPerformer: PerformerEntity = performerList[0];
      const performer: PerformerEntity = await service.findOne(storedPerformer.id);
  
      expect(performer).not.toBeNull();
      expect(performer.name).toEqual(storedPerformer.name);
      expect(performer.image).toEqual(storedPerformer.image);
      expect(performer.description).toEqual(storedPerformer.description);
    });
  
    it('Throw excepción del findOne de un performer inválido', async () => {
      await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "El performer no fue encontado");
    });
  
  });
  


});
