import OpenAI from 'openai';

interface Options {
  threadId: string;
}

export const getMessageListUseCase = async (
  openIa: OpenAI,
  options: Options,
) => {
  const { threadId } = options;
  const messageList = await openIa.beta.threads.messages.list(threadId);

  const messages = messageList.data.map((message) => ({
    role: message.role,
    content: message.content.map((content) => (content as any).text.value),
  }));
  return messages;
};
