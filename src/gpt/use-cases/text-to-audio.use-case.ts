import * as path from 'path';
import * as fs from 'fs';
import OpenAI from 'openai';

interface Options {
  prompt: string;
  voice?: string;
}

export const textToAudioUseCase = async (openIa: OpenAI, options: Options) => {
  const { prompt, voice } = options;
  const voices = {
    nova: 'nova',
    alloy: 'alloy',
    echo: 'echo',
    fable: 'fable',
    onyx: 'onyx',
    shimmer: 'shimmer',
  };
  const selectedVoice = voices[voice] ?? 'nova';

  const folderPath = path.join(__dirname, '../../../genereted/audios/');
  const speachFile = path.resolve(folderPath, `./${new Date().getTime()}.mp3`);
  fs.mkdirSync(folderPath, { recursive: true });
  const mp3 = await openIa.audio.speech.create({
    model: 'tts-1',
    voice: selectedVoice,
    input: prompt,
    response_format: 'mp3',
  });
  const buffer = Buffer.from(await mp3.arrayBuffer());
  fs.writeFileSync(speachFile, buffer);
  return speachFile;
};

export const getAudioByIdUseCase = async (id: string) => {
  const speachFile = path.resolve(
    __dirname,
    `../../../genereted/audios/${id}.mp3`,
  );
  const exists = fs.existsSync(speachFile);
  if (exists) {
    return speachFile;
  }
  return null;
};
