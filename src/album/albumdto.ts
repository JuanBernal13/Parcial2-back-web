/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsDate, Length } from 'class-validator';

export class AlbumDto {
  @IsNotEmpty()
  @Length(1, 500)
  name: string;

  @IsNotEmpty()
  @IsString()
  coverImage: string;

  @IsNotEmpty()
  @IsDate()
  releaseDate: Date;

  @IsNotEmpty()
  @IsString()
  description: string;
}
