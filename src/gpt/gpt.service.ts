import { Injectable } from '@nestjs/common';
import {
  orthographyCheckUseCase,
  prosConsDiscusserUseCase,
  prosConsStreamUseCase,
  translateUseCase,
} from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TranslateDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openIa = new OpenAI({
    apiKey: process.env.OPENIA_API_KEY,
  });
  async orthographyCheck(body: OrthographyDto) {
    return await orthographyCheckUseCase(this.openIa, body);
  }
  async prosConsDiscusser(body: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openIa, body);
  }
  async prosConsStream(body: ProsConsDiscusserDto) {
    return await prosConsStreamUseCase(this.openIa, body);
  }
  async translate(body: TranslateDto): Promise<any> {
    return await translateUseCase(this.openIa, body);
  }
}
