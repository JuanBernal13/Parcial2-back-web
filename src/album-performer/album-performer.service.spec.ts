/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumEntity } from '../album/album.entity';
import { PerformerEntity } from '../performer/performer.entity';
import { AlbumPerformersService } from './album-performer.service';

import { faker } from '@faker-js/faker';

describe('AlbumPerformersService', () => {
  let service: AlbumPerformersService;
  let albumRepository: Repository<AlbumEntity>;
  let performerRepository: Repository<PerformerEntity>;
  let albumList: AlbumEntity[];
  let performerList: PerformerEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumPerformersService],
    }).compile();

    service = module.get<AlbumPerformersService>(AlbumPerformersService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    performerRepository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await albumRepository.clear();
    await performerRepository.clear();

    albumList = [];
    performerList = [];

    for (let i = 0; i < 5; i++) {
      const performer = await performerRepository.save({
        name: faker.lorem.sentence(),
        image: faker.image.url(),
        description: faker.lorem.paragraph(),
      });
      performerList.push(performer);
    }

    for (let i = 0; i < 5; i++) {
      const album = await albumRepository.save({
        name: faker.lorem.sentence(),
        releaseDate: faker.date.past(),
        coverImage: faker.image.url(),
        description: faker.lorem.paragraph(),
        performers: []
      });
      albumList.push(album);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Debería añadir un performer a un álbum exitosamente', async () => {
    const album = albumList[0];
    const performerToAdd = performerList[0];

    expect(album.performers.some(p => p.id === performerToAdd.id)).toBe(false);

    expect(album.performers.length).toBeLessThan(3);

    const updatedAlbum = await service.addPerformerToAlbum(album.id, performerToAdd.id);

    // Verificar que el performer haya sido añadido
    expect(updatedAlbum.performers.some(p => p.id === performerToAdd.id)).toBe(true);
  });

  it('Debería lanzar una excepción cuando un álbum ya tiene 3 performers asociados', async () => {
    // Seleccionar un álbum y tres performers
    const album = albumList[0];
    const performersToAdd = performerList.slice(0, 3);

    // Agregar los tres performers al álbum
    for (const performer of performersToAdd) {
      await service.addPerformerToAlbum(album.id, performer.id);
    }

    // Seleccionar un cuarto performer que no esté en el álbum
    const newPerformer = performerList.find(p => !performersToAdd.includes(p));

    // Intentar añadir el cuarto performer al álbum
    await expect(service.addPerformerToAlbum(album.id, newPerformer.id)).rejects.toHaveProperty("message", "Un album no puede tener mas de 3 performers asociados");
  });
});
