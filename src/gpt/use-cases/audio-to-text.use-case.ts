import * as fs from 'fs';
import OpenAI from 'openai';

interface Options {
  prompt?: string;
  audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async (openIa: OpenAI, options: Options) => {
  const { prompt, audioFile } = options;

  const responseText = await openIa.audio.transcriptions.create({
    model: 'whisper-1',
    file: fs.createReadStream(audioFile.path),
    language: 'en',
    prompt: prompt,
    //response_format: 'srt', //"vtt"
    response_format: 'verbose_json',
  });
  return responseText;
};
