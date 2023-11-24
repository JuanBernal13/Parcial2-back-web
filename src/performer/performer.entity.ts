/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';

@Entity()
export class PerformerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column()
  image: string;

  @Column('text')
  description: string;

  @ManyToMany(() => AlbumEntity, album => album.performers)
  albums: AlbumEntity[];
}
