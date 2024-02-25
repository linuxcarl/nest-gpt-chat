import { Body, Controller, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import { ProsConsStreamDto } from './dtos/ProsConsStream.dto';
import { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() body: OrthographyDto) {
    return this.gptService.orthographyCheck(body);
  }

  @Post('pros-cons')
  prosConsDicusser(@Body() body: ProsConsDiscusserDto) {
    return this.gptService.prosConsDiscusser(body);
  }

  @Post('pros-cons-stream')
  async prosConsStream(@Body() body: ProsConsStreamDto, @Res() res: Response) {
    const stream = await this.gptService.prosConsStream(body);
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      console.log(piece);
      res.write(piece);
    }
    res.end();
  }
}
