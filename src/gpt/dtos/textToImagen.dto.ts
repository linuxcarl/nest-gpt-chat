import { IsInt, IsOptional, IsString } from 'class-validator';

export class textToImagenDto {
  @IsString()
  readonly prompt: string;

  @IsString()
  @IsOptional()
  readonly originalImage?: string;

  @IsString()
  @IsOptional()
  readonly maskImage?: string;

  @IsInt()
  @IsOptional()
  readonly max_tokens?: number;
}
