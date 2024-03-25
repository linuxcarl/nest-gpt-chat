import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';
import {
  downloadBase64ImageAsPng,
  downloadImageAsPng,
} from '../helpers/download-image-as-png';

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
    size: '1024x1024',
    quality: 'standard',
    response_format: 'url',
  });

  const fileName = await downloadImageAsPng(image.data[0].url);

  return {
    url: `${process.env.URI_SERVER}/gpt/texto-to-imagen/${fileName}`,
    localPath: image.data[0].url,
    originalImage,
    maskImage,
    revised_path: image.data[0].revised_prompt,
  };
};
export const editImageUseCase = async (openIa: OpenAI, options: Options) => {
  const { prompt, originalImage, maskImage } = options;
  const pngImagenPath = await downloadImageAsPng(originalImage);
  const maskPath = await downloadBase64ImageAsPng(maskImage);

  const response = await openIa.images.edit({
    prompt,
    image: fs.createReadStream(pngImagenPath),
    mask: fs.createReadStream(maskPath),
    n: 1,
    model: 'dall-e-2',
    response_format: 'url',
    size: '1024x1024',
  });
  return response;
};
export const getImageUseCase = async (name: string) => {
  const speachImage = path.resolve(
    __dirname,
    `../../../generated/images/${name}`,
  );
  const exists = fs.existsSync(speachImage);
  if (exists) {
    return speachImage;
  }
  return null;
};
