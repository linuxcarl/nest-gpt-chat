import { Body, Controller, Post } from '@nestjs/common';
import { SamAsistentService } from './sam-asistent.service';
import { QuestionsDto } from './dtos/questions.dto';

@Controller('sam-asistent')
export class SamAsistentController {
  constructor(private readonly samAsistentService: SamAsistentService) {}

  @Post('create-thread')
  async createThread() {
    return await this.samAsistentService.createThread();
  }

  @Post('user-question')
  async userQuestion(@Body() payload: QuestionsDto) {
    return await this.samAsistentService.userQuestion(payload);
  }
}
