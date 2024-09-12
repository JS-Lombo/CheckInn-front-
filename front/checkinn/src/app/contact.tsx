import React, { useEffect, useState } from 'react';
import { sendMessage, onMessageReceived, getMessages } from '@/components/ChatUserAdmin/chatService';

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

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessages(senderId);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [senderId]);

  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    onMessageReceived(handleNewMessage);

    return () => {
      // Cleanup subscription if necessary
    };
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      try {
        await sendMessage(message, senderId, receiverId);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
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

export default Chat;
