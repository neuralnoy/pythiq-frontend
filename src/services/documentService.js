const API_URL = 'http://localhost:8000/api';

const getHeaders = (token) => ({
  'Authorization': `Bearer ${token}`
});

export const documentService = {
  async uploadDocument(knowledgeBaseId, file, token) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/documents/${knowledgeBaseId}/upload`, {
      method: 'POST',
      headers: getHeaders(token),
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Upload failed');
    }

    return await response.json();
  },

  async getDocuments(knowledgeBaseId, token) {
    console.log('Fetching documents for KB:', knowledgeBaseId);
    const response = await fetch(`${API_URL}/documents/${knowledgeBaseId}`, {
      headers: getHeaders(token)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch documents');
    }

    const data = await response.json();
    console.log('Fetched documents:', data);
    return data;
  }
}; 