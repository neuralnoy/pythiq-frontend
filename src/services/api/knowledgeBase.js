// src/services/api/knowledgeBase.js
export const fetchUserKnowledgeBases = async () => {
  const response = await fetch('http://localhost:8000/api/knowledge-bases', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) throw new Error('Failed to fetch knowledge bases');
  return response.json();
};

export const createKnowledgeBase = async (data) => {
  const response = await fetch('http://localhost:8000/api/knowledge-bases', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to create knowledge base');
  }

  return response.json();
};