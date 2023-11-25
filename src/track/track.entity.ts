/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column('float')
  duration: number;

  @ManyToOne(() => AlbumEntity, album => album.tracks)
  album: AlbumEntity;
}
