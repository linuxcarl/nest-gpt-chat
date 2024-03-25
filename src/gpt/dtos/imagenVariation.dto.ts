import { IsString } from 'class-validator';

export class imagenVariationDto {
  @IsString()
  baseImage: string;
}
