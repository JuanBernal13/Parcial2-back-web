/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { TrackEntity } from '../track/track.entity';
import { PerformerEntity } from '../performer/performer.entity';
@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column()
  coverImage: string;

  @Column()
  releaseDate: Date;

  @Column('text')
  description: string;

  @OneToMany(() => TrackEntity, track => track.album)
  tracks: TrackEntity[];

  @ManyToMany(() => PerformerEntity)
  @JoinTable()
  performers: PerformerEntity[];
}
