import OpenAI from 'openai';

export const createThreadUseCase = async (openIa: OpenAI) => {
  const { id } = await openIa.beta.threads.create();
  return { id };
};
