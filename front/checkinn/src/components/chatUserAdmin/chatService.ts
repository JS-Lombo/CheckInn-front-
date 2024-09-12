// `chatService.ts`

import io, { Socket } from 'socket.io-client';
import axios from 'axios';

interface Message {
  sender: string;
  text: string;
}

interface SendMessagePayload {
  senderId: string;
  text: string;
  receiverId: string;
}

const socket: Socket = io('https://checkinn-3nud.onrender.com', {
  transports: ['websocket'],
});

export const sendMessage = (message: string, senderId: string, receiverId: string): void => {
  const payload: SendMessagePayload = { senderId, text: message, receiverId };
  socket.emit('sendMessage', payload);
};

export const onMessageReceived = (callback: (message: Message) => void): void => {
  socket.on('receiveMessage', callback);
};

export const getMessages = async (accountId: string): Promise<Message[]> => {
  try {
    const response = await axios.get<Message[]>(`https://checkinn-3nud.onrender.com/inbox/messages/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};
