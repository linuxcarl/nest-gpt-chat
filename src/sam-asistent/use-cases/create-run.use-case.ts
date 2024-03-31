import OpenAI from 'openai';

interface Options {
  threadId: string;
  assistentId?: string;
}

export const createRunUseCase = async (openIa: OpenAI, options: Options) => {
  const { threadId, assistentId = 'asst_eGrgZfZNr5bIi3SLS2FJOe6e' } = options;
  const run = await openIa.beta.threads.runs.create(threadId, {
    assistant_id: assistentId,
    //instructions: "instructionsss...."// esto cambia el contexto del boot y reiscribe todo el contexto
  });
  return run;
};
