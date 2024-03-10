import { Injectable } from '@nestjs/common';
import {
  audioToTextUseCase,
  getAudioByIdUseCase,
  orthographyCheckUseCase,
  prosConsDiscusserUseCase,
  prosConsStreamUseCase,
  textToAudioUseCase,
  translateUseCase,
} from './use-cases';
import {
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';
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
  async textToAudio(body: TextToAudioDto) {
    return await textToAudioUseCase(this.openIa, body);
  }
  async getAudio(fileId: string) {
    return await getAudioByIdUseCase(fileId);
  }
  async AudioToText(body) {
    return await audioToTextUseCase(this.openIa, body);
  }
}
