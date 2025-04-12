import { Send } from 'lucide-react';
import { useChat } from 'ai/react';

export function ChatInput() {
  const { input, handleInputChange, handleSubmit } = useChat();

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message..."
        className="flex-1 bg-transparent border-none outline-none"
      />
      <button type="submit" className="p-2 rounded-md hover:bg-accent">
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
