import { IsInt, IsOptional, IsString } from 'class-validator';

export class TextToAudioDto {
  @IsString()
  readonly prompt: string;
  @IsString()
  @IsOptional()
  readonly voice?: string;
  @IsInt()
  @IsOptional()
  readonly max_tokens?: number;
}
export class GetAudioDto {
  @IsString()
  readonly fileId: string;
}
