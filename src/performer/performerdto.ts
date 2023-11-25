/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export class PerformerDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  description: string;
}
