import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (openIa: OpenAI, options: Options) => {
  const { prompt, lang } = options;
  const completion = await openIa.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${lang}:${prompt}`,
      },
      {
        role: 'user',
        content: options.prompt,
      },
    ],
    model: 'gpt-3.5-turbo',
  });
  return completion.choices[0].message;
};
