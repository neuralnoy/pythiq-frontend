const API_URL = 'http://localhost:8000/api';

const getHeaders = (token) => ({
  'Authorization': `Bearer ${token}`
});

export const documentService = {
  async uploadDocument(knowledgeBaseId, file, token) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/documents/${knowledgeBaseId}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Upload error:', error);
        throw new Error(error.detail || 'Upload failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
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
  },

  async deleteDocument(knowledgeBaseId, documentId, token) {
    const response = await fetch(`${API_URL}/documents/${knowledgeBaseId}/${documentId}`, {
      method: 'DELETE',
      headers: getHeaders(token)
    });

    if (!response.ok) {
      throw new Error('Failed to delete document');
    }
  },

  async renameDocument(knowledgeBaseId, documentId, newName, token) {
    const response = await fetch(
      `${API_URL}/documents/${knowledgeBaseId}/${documentId}/rename`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to rename document');
    }

    return await response.json();
  },

  async getDownloadUrl(knowledgeBaseId, documentId, token) {
    const response = await fetch(
      `${API_URL}/documents/${knowledgeBaseId}/${documentId}/download`,
      { 
        headers: getHeaders(token),
        responseType: 'blob'
      }
    );

    if (!response.ok) {
      throw new Error('Failed to download file');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const contentDisposition = response.headers.get('content-disposition');
    const filename = contentDisposition
      ? contentDisposition.split('filename=')[1].replace(/"/g, '')
      : 'download';

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  async toggleDocumentEnabled(knowledgeBaseId, documentId, token) {
    const response = await fetch(
      `${API_URL}/documents/${knowledgeBaseId}/${documentId}/toggle`,
      {
        method: 'PATCH',
        headers: getHeaders(token)
      }
    );

    if (!response.ok) {
      throw new Error('Failed to toggle document status');
    }

    return await response.json();
  }
}; 