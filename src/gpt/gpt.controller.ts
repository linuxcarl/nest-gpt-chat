import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GptService } from './gpt.service';
import {
  GetAudioDto,
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
  textToImagenDto,
} from './dtos';
import { ProsConsStreamDto } from './dtos/ProsConsStream.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AudioToTextDto } from './dtos/audioToText.dto';
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
  async textToAudio(@Body() body: TextToAudioDto, @Res() res: Response) {
    const filePaht = await this.gptService.textToAudio(body);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(200);
    res.sendFile(filePaht);
  }

  @Get('text-to-audio/:fileId')
  async textToAudioGet(@Param() fileId: GetAudioDto, @Res() res: Response) {
    const { fileId: file } = fileId;
    const fileAudio = await this.gptService.getAudio(file);
    if (!fileAudio) {
      throw new NotFoundException(`File ${file} not found`);
    }
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(200);
    res.sendFile(fileAudio);
  }

  @Post('audio-to-text')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './generated/audios',
        filename: (req, file, cb) => {
          const fileExtention = file.originalname.split('.').pop();
          const fileName = `${new Date().getTime()}.${fileExtention}`;
          return cb(null, fileName);
        },
      }),
    }),
  )
  audioToText(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 20,
            message: 'File too large. Max file size is 20mb',
          }),
          new FileTypeValidator({
            fileType: 'audio/*',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: AudioToTextDto,
  ) {
    return this.gptService.AudioToText({
      audioFile: file,
      prompt: body.prompt,
    });
  }

  @Post('texto-to-imagen')
  textToImagen(@Body() body: textToImagenDto) {
    return this.gptService.textToImage(body);
  }
  @Get('texto-to-imagen/:name')
  async getImagenById(
    @Param() parms: { name: string },
    @Res() response: Response,
  ) {
    const { name } = parms;
    const res = await this.gptService.getImage(name);
    response.setHeader('Content-Type', 'image/png');
    response.status(200);
    response.sendFile(res);
  }
}
