/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';
import { AlbumEntity } from '../album/album.entity';

import { faker } from '@faker-js/faker';

describe('TrackService', () => {
  let service: TrackService;
  let trackRepository: Repository<TrackEntity>;
  let albumRepository: Repository<AlbumEntity>;
  let trackList: TrackEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TrackService],
    }).compile();

    service = module.get<TrackService>(TrackService);
    trackRepository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await trackRepository.clear();
    await albumRepository.clear();
    trackList = [];
    for (let i = 0; i < 5; i++) {
      const album = await albumRepository.save({
        name: faker.lorem.sentence(),
        releaseDate: faker.date.past(),
        coverImage: faker.image.url(),
        description: faker.lorem.paragraph(),
      });

      const track: TrackEntity = await trackRepository.save({
        name: faker.lorem.sentence(),
        duration: faker.number.int({ min: 1, max: 300 }),
        album
      });

      trackList.push(track);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Debería retornar todos los tracks', async () => {
    const tracks = await service.findAll();

    expect(tracks.length).toEqual(trackList.length);

});

describe('TrackService', () => {
  
    beforeEach(async () => {
    });
  
    it('Debería retornar un track por su ID', async () => {
      const storedTrack: TrackEntity = trackList[0];
      const track: TrackEntity = await service.findOne(storedTrack.id);
  
      expect(track).not.toBeNull();
      expect(track.id).toEqual(storedTrack.id);
      expect(track.name).toEqual(storedTrack.name);
      expect(track.duration).toEqual(storedTrack.duration);
      
    });
  
    it('Debería lanzar una excepción cuando el track no es encontrado', async () => {
      await expect(service.findOne("id_inexistente")).rejects.toHaveProperty("message", "El track no fue encontrado");
    });
  });
  
  it('Debería lanzar una excepción cuando el álbum a asociar no existe', async () => {
    const newTrackData: TrackEntity = {
        id: "", 
        name: faker.lorem.sentence(), 
        duration: faker.number.int({ min: 1, max: 300 }), 
        album: null 
      };
    const nonExistentAlbumId = "id_inexistente";

    await expect(service.create(nonExistentAlbumId, newTrackData)).rejects.toHaveProperty("message", "El album a asociar no existe");
  });

  it('Debería lanzar una excepción cuando la duración del track no es un número positivo', async () => {
    const invalidTrackData: TrackEntity = {
        id: "", 
        name: faker.lorem.sentence(), 
        duration: -1, 
        album: null 
      };
    const validAlbumId = trackList[0].album.id; 

    await expect(service.create(validAlbumId, invalidTrackData)).rejects.toHaveProperty("message", "Su duracion debe ser un numero positivo");
  });

});
