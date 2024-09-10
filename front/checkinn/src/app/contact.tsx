"use client";
import React, { useEffect, useState } from 'react';
import { sendMessage, onMessageReceived, getMessages } from '../components/chatUserAdmin/chatService'

interface ChatProps {
  senderId: string;
  receiverId: string;
}

interface Message {
  sender: string;
  text: string;
}

interface ContactChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Chat: React.FC<ChatProps> = ({ senderId, receiverId }) => {
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
      placeholder="Type your message..."
      className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <button
      onClick={handleSendMessage}
      className="bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Send
    </button>
  </div>
);
};

export const ContactChat: React.FC<ContactChatProps> = ({ onClose, isOpen }) => {
if (!isOpen) return null;

// Dummy IDs for example; replace with actual sender and receiver IDs
const senderId = "user123";
const receiverId = "admin123";

return (
  <div className="fixed bottom-0 right-0 w-full max-w-md bg-white shadow-lg rounded-lg">
    <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-lg">
      <h2 className="text-lg font-semibold">Contact Support</h2>
      <button
        onClick={onClose}
        className="text-2xl font-bold focus:outline-none"
      >
        &times;
      </button>
    </div>
    <div className="p-4 flex flex-col h-80">
      <Chat senderId={senderId} receiverId={receiverId} />
    </div>
  </div>
);
};
