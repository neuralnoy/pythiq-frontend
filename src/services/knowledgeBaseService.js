const API_URL = 'http://localhost:8000/api';

export const knowledgeBaseService = {
  async getKnowledgeBases() {
    const response = await fetch(`${API_URL}/knowledge-bases/`, {
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch knowledge bases');
    }
    return await response.json();
  },

  async createKnowledgeBase(title) {
    const response = await fetch(`${API_URL}/knowledge-bases/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'Title already exists');
    }
    return data;
  },

  async deleteKnowledgeBase(id) {
    const response = await fetch(`${API_URL}/knowledge-bases/${id}/`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error('Failed to delete knowledge base');
    }
  },

  async renameKnowledgeBase(id, newTitle) {
    const response = await fetch(`${API_URL}/knowledge-bases/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTitle }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'Failed to rename knowledge base');
    }
    return data;
  }
};
