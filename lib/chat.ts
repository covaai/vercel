import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function getChatById({ id }: { id: string }) {
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function saveChat({
  id,
  userId,
  title,
}: {
  id: string;
  userId: string;
  title: string;
}) {
  const { error } = await supabase.from('chats').insert({
    id,
    user_id: userId,
    title,
  });

  if (error) throw error;
}

export async function saveMessages({
  messages,
}: {
  messages: Array<{
    id: string;
    chatId: string;
    role: string;
    parts: string[];
    attachments?: any[];
    createdAt: Date;
  }>;
}) {
  const { error } = await supabase.from('messages').insert(
    messages.map((msg) => ({
      id: msg.id,
      chat_id: msg.chatId,
      role: msg.role,
      content: msg.parts.join('\n'),
      attachments: msg.attachments,
      created_at: msg.createdAt,
    })),
  );

  if (error) throw error;
}
