import { IsString } from 'class-validator';

export class QuestionsDto {
  @IsString()
  readonly threadId: string;
  @IsString()
  readonly question: string;
}
