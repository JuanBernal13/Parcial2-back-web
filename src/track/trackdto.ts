/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Length, IsNumber, Min } from 'class-validator';

export class TrackDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  duration: number;


}
