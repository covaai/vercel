export async function generateTitleFromUserMessage({
  message,
}: {
  message: { parts: string[] };
}) {
  // Use the first part of the message as the title
  return message.parts[0] || 'New Chat';
}
