import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  createThreadUseCase,
  createRunUseCase,
  createMessageUseCase,
  checkCompleteStatusUseCase,
  getMessageListUseCase,
} from './use-cases/';
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
    const { threadId, question } = payload;
    await createMessageUseCase(this.openIa, {
      threadId,
      question,
    });
    const run = await createRunUseCase(this.openIa, {
      threadId: threadId,
    });
    const { id: runId } = run;
    await checkCompleteStatusUseCase(this.openIa, {
      threadId,
      runId,
    });
    const messages = await getMessageListUseCase(this.openIa, {
      threadId,
    });
    return messages;
  }
}
