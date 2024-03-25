import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';
import { downloadImageAsPng } from '../helpers/download-image-as-png';

interface Options {
  baseImage: string;
}

export const imageVariationUseCase = async (
  openIa: OpenAI,
  options: Options,
) => {
  const { baseImage } = options;
  const imagePng = await downloadImageAsPng(baseImage, true);
  const image = await openIa.images.createVariation({
    model: 'dall-e-2',
    n: 1,
    image: fs.createReadStream(imagePng),
    size: '1024x1024',
    response_format: 'url',
  });
  const fileName = await downloadImageAsPng(image.data[0].url);
  const url = `${process.env.URI_SERVER}/gpt/texto-to-imagen/${fileName}`;

  return {
    url,
    localPath: image.data[0].url,
    revised_path: image.data[0].revised_prompt,
  };
};
