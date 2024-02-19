import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import OpenAI from 'openai';
import { json } from 'stream/consumers';

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
            // 'Actua como un medico especializado en regeneracion celular, intermitente, suplementos epigeneticos y con conocimiento avanzado en enfermendades cronicas degenerativas. Tu nombre es Dra. Lucy',
            'Necesito que apliques correccion ortografica del texto que se te enviara . Debes validar que las palabreas existan en el diccionario español y que esten escritas correctamente. y debes de contestar en json con el siguiente formato: {userScore: number; errors:["error"=>"solucion"], messages:string}',
        },
        {
          role: 'user',
          content: options.prompt,
        },
      ],
      model: 'gpt-3.5-turbo',
    });
    const response = JSON.parse(completion.choices[0].message.content);
    return response;
  } catch (error) {
    throw new ExceptionsHandler(error);
  }
};
