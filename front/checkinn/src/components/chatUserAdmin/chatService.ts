import axios from 'axios';

const API_URL = 'http://localhost:8080/inbox';

// Define la interfaz Message aquí
interface Message {
  sender: string;
  text: string;
}

export const sendMessage = async (message: string, senderId: string, receiverId: string) => {
  try {
    const response = await axios.post(`${API_URL}/send`, {
      senderId,
      receiverId,
      message,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Si es necesario para autenticación
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getMessages = async (accountId: string) => {
  try {
    const response = await axios.get(`${API_URL}/messages/${accountId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Si es necesario para autenticación
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

// Supongamos que `onMessageReceived` es un stub por ahora
export const onMessageReceived = (callback: (message: any) => void) => {
  // Implementa la lógica para escuchar mensajes nuevos (WebSocket, SSE, etc.)
};
