const API_URL = 'http://localhost:8000/api';

export const chatService = {
  async createChat(data) {
    const response = await fetch(`${API_URL}/chats/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        knowledge_base_ids: data.knowledgeBaseIds
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to create chat');
    }
    
    return await response.json();
  },

  async getChats() {
    const response = await fetch(`${API_URL}/chats/`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch chats');
    }

    return await response.json();
  },

  async deleteChat(chatId) {
    const response = await fetch(`${API_URL}/chats/${chatId}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to delete chat');
    }
  },

  async sendMessage(chatId, content) {
    const response = await fetch(`${API_URL}/chats/${chatId}/messages`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to send message');
    }

    return await response.json();
  },

  async getChatMessages(chatId) {
    const response = await fetch(`${API_URL}/chats/${chatId}/messages`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    return await response.json();
  }
}; 