import OpenAI from 'openai';

interface Options {
  threadId: string;
  runId: string;
}

export const checkCompleteStatusUseCase = async (
  openIa: OpenAI,
  options: Options,
) => {
  const { threadId, runId } = options;

  const runStatus = await openIa.beta.threads.runs.retrieve(threadId, runId);

  if (runStatus.status === 'completed') {
    return runStatus;
  }
  //esperar 1 segundo
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return await checkCompleteStatusUseCase(openIa, options);
};
