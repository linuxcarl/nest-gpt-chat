import { Body, Controller, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import {
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';
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
  async prosConsDicusser(@Body() body: ProsConsDiscusserDto) {
    const res = await this.gptService.prosConsDiscusser(body);
    console.log(res);
    return res;
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

  @Post('translate')
  translate(@Body() body: TranslateDto) {
    return this.gptService.translate(body);
  }

  @Post('text-to-audio')
  textToAudio(@Body() body: TextToAudioDto) {
    return this.gptService.textToAudio(body);
  }
}
