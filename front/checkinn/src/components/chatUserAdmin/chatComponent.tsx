import React, { useEffect, useState } from 'react';
import { sendMessage, onMessageReceived, getMessages } from '@/components/chatUserAdmin/chatService';

interface ChatProps {
  senderId: string;
  receiverId: string;
}

interface Message {
  sender: string;
  text: string;
}

const Chat: React.FC<ChatProps> = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  // Cargar mensajes al iniciar el componente
  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await getMessages(senderId);
      setMessages(fetchedMessages);
    };

    fetchMessages();
  }, [senderId]);

  // Manejar recepción de nuevos mensajes
  useEffect(() => {
    onMessageReceived((newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, []);

  // Enviar mensaje
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      sendMessage(message, senderId, receiverId);
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            {msg.sender === senderId ? 'You: ' : 'Admin: '}
            {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
