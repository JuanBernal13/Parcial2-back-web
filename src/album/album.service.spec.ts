/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';

import { faker } from '@faker-js/faker';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumList: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    albumList = [];
    for(let i = 0; i < 5; i++){
        const album: AlbumEntity = await repository.save({
        name: faker.lorem.sentence(), 
        description: faker.lorem.paragraph(), 
        releaseDate: faker.date.past(), 
        coverImage: faker.image.url()
        })
        albumList.push(album);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Crear nuevo album exitosamente', async () => {
    const album: AlbumEntity = {
      id: "",
      name: faker.lorem.sentence(), 
      description: faker.lorem.sentence(),
      releaseDate: faker.date.past(), 
      coverImage: faker.image.url(),
      tracks: [],
      performers:[]
    }

    const newAlbum: AlbumEntity = await service.create(album);
    expect(newAlbum).not.toBeNull();

    const storedAlbum: AlbumEntity = await repository.findOne({where: {id: newAlbum.id}})
    expect(storedAlbum).not.toBeNull();
    expect(storedAlbum.name).toEqual(newAlbum.name);
    expect(storedAlbum.description).toEqual(newAlbum.description);
  });

  it('Crear excepcion para cuando se crea album con descripcion vacia', async () => {
    const album: Partial<AlbumEntity> = {
      name: faker.lorem.sentence(),
      description: '', 
      releaseDate: faker.date.past(),
      coverImage: faker.image.url(),
      tracks: [], 
      performers: [],
    };
  
    await expect(service.create(album as AlbumEntity)).rejects.toHaveProperty(
      "message", "El nombre y descripcion no puede ser vacia"
    );
  });
  
});