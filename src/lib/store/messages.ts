import { create } from 'zustand';
import { LIMIT_MESSAGES } from '../constant';

export type Imessage = {
    created_at: string;
    id: string;
    is_edit: boolean;
    send_by: string;
    text: string;
    users: {
        avatar_url: string;
        created_at: string;
        display_name: string;
        id: string;
    } | null;
}

interface MessageState {
  hasMore: boolean;
  messages:Imessage[]
  page: number
  actionMessage: Imessage | undefined;
  addMessage: (message: Imessage) => void;
  setActionMessage: (message: Imessage) => void;
  deleteMessage: (messageId: string) => void;
  editMessage: (message: Imessage) => void;
  optimisticIds: string[];
  setOptimisticIds: (id: string) => void;
  setMessages: (newMessages: Imessage[]) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  hasMore: true,
  messages: [],
  page: 1,
  optimisticIds: [],
  actionMessage: undefined,
  addMessage: (newMessages) => set((state) => ({ 
    messages: [...state.messages, newMessages],
    optimisticIds: [...state.optimisticIds, newMessages.id]
   })),
  setActionMessage: (message) => set((state) => ({ actionMessage: message })),
  deleteMessage: (messageId) => set((state) => ({ messages: state.messages.filter((msg) => msg.id !== messageId) })),
  editMessage: (updateMessage) =>
		set((state) => {
			return {
				messages: state.messages.filter((message) => {
					if (message.id === updateMessage.id) {
						(message.text = updateMessage.text),
							(message.is_edit = updateMessage.is_edit);
					}
					return message;
				}),
			};
		}),
    setOptimisticIds: (id: string) =>
      set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
    setMessages: (newMessages) => set((state) => ({ 
      messages: [...newMessages,...state.messages ],
      page: state.page + 1,
      hasMore: newMessages.length >= LIMIT_MESSAGES
     })),
}));
