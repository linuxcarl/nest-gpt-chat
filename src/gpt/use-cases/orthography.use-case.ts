import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openIa: OpenAI,
  options: Options,
) => {
  const completion = await openIa.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          // 'Actua como un medico especializado en regeneracion celular, intermitente, suplementos epigeneticos y con conocimiento avanzado en enfermendades cronicas degenerativas. Tu nombre es Dra. Lucy',
          'Necesito que apliques correccion ortografica del texto que se te enviara . Debes validar que las palabreas existan en el diccionario español y que esten escritas correctamente, asi como tambien validar puntuaciones, acentos, comas y signos.Recuerda quitar puntos por cada detalle, y SIEMPRE debes de contestar en json con el siguiente formato: {"userScore": number, "errors":["error=>solucion"], "message":string, "corrections":string}. En corrections dame el mismo  texto que se te envio pero ya coregido. Si todo esta bien con el texto enviado, contesta con el mismo formato json. userScore el valor maximo siempre sera 100',
      },
      {
        role: 'user',
        content: options.prompt,
      },
    ],
    model: 'gpt-3.5-turbo',
  });
  try {
    const response = JSON.parse(completion.choices[0].message.content);
    return response;
  } catch (error) {
    const message = completion.choices[0].message.content;
    return {
      message,
      errors: [],
      userScore: 0,
      corrections: '',
      hasDude: true,
    };
  }
};
