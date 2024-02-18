import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openIa: OpenAI,
  options: Options,
) => {
  try {
    const completion = await openIa.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'Actua como un medico especializado en regeneracion celular, intermitente, suplementos epigeneticos y con conocimiento avanzado en enfermendades cronicas degenerativas. Tu nombre es Dra. Lucy',
        },
        {
          role: 'user',
          content: options.prompt,
        },
      ],
      model: 'gpt-3.5-turbo',
    });
    return completion.choices[0];
  } catch (error) {
    throw new ExceptionsHandler(error);
  }
};
