/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { PerformerModule } from './performer/performer.module';
import { AlbumPerformersModule } from './album-performer/album-performer.module';

import { AlbumEntity } from './album/album.entity';
import { TrackEntity } from './track/track.entity';
import { PerformerEntity } from './performer/performer.entity';


@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '123',
      database: 'prueba',
      entities: [AlbumEntity , TrackEntity , PerformerEntity], 
      synchronize: true, 
      keepConnectionAlive: true,
      logging: true,

    }),
    
    AlbumModule,
    
    TrackModule,
    
    PerformerModule,
    
    AlbumPerformersModule,
    
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
