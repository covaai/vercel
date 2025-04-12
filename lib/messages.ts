import { v4 as uuidv4 } from 'uuid';

export function generateUUID() {
  return uuidv4();
}

export function getMostRecentUserMessage(
  messages: Array<{ role: string; parts: string[] }>,
) {
  return messages
    .slice()
    .reverse()
    .find((message) => message.role === 'user');
}

export function getTrailingMessageId(messages: Array<{ id: string }>) {
  return messages[messages.length - 1]?.id;
}

export function appendResponseMessages({
  messages,
  responseMessages,
}: {
  messages: Array<{ parts: string[] }>;
  responseMessages: Array<{ parts: string[] }>;
}) {
  return [...messages, ...responseMessages];
}
