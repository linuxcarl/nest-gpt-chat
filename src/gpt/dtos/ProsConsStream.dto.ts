import { IsString } from 'class-validator';

export class ProsConsStreamDto {
  @IsString()
  readonly prompt: string;
}
