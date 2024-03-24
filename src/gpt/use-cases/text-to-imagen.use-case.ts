import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';
import { downloadImageAsPng } from '../helpers/download-image-as-png';

interface Options {
  prompt?: string;
  originalImage?: string;
  maskImage?: string;
}

export const textToImagenUseCase = async (openIa: OpenAI, options: Options) => {
  const { prompt, originalImage, maskImage } = options;
  const image = await openIa.images.generate({
    prompt,
    model: 'dall-e-3',
    n: 1,
    size: '1024x1792',
    quality: 'standard',
    response_format: 'url',
  });

  const url = await downloadImageAsPng(image.data[0].url);

  return {
    url: url,
    localPath: image.data[0].url,
    originalImage,
    maskImage,
    revised_path: image.data[0].revised_prompt,
  };
};

export const getImageUseCase = async (name: string) => {
  const speachImage = path.resolve(
    __dirname,
    `../../../generated/images/${name}.png`,
  );
  const exists = fs.existsSync(speachImage);
  if (exists) {
    return speachImage;
  }
  return null;
};
