import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { createThreadUseCase } from './use-cases/create-thread.use-case';
import { createMessageUseCase } from './use-cases/create-message.use-case';
import { QuestionsDto } from './dtos/questions.dto';

@Injectable()
export class SamAsistentService {
  private openIa = new OpenAI({
    apiKey: process.env.OPENIA_API_KEY,
  });
  async createThread() {
    return createThreadUseCase(this.openIa);
  }
  async userQuestion(payload: QuestionsDto) {
    const response = createMessageUseCase(this.openIa, payload);
    console.log(response);
    return response;
  }
}
