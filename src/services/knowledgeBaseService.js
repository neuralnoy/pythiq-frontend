const API_URL = 'http://localhost:8000/api';

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
});

export const knowledgeBaseService = {
  async getKnowledgeBases(token) {
    const response = await fetch(`${API_URL}/knowledge-bases/`, {
      headers: getHeaders(token)
    });
    if (!response.ok) {
      throw new Error('Failed to fetch knowledge bases');
    }
    return await response.json();
  },

  async createKnowledgeBase(title, token) {
    const response = await fetch(`${API_URL}/knowledge-bases/`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({ title }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'Title already exists');
    }
    return data;
  },

  async deleteKnowledgeBase(id, token) {
    const response = await fetch(`${API_URL}/knowledge-bases/${id}/`, {
      method: 'DELETE',
      headers: getHeaders(token)
    });
    if (!response.ok) {
      throw new Error('Failed to delete knowledge base');
    }
  },

  async renameKnowledgeBase(id, newTitle, token) {
    const response = await fetch(`${API_URL}/knowledge-bases/${id}`, {
      method: 'PATCH',
      headers: getHeaders(token),
      body: JSON.stringify({ title: newTitle }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'Failed to rename knowledge base');
    }
    return data;
  }
};
