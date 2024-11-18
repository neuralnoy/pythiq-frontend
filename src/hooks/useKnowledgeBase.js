import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { knowledgeBaseService } from '../services/knowledgeBaseService';

export const useKnowledgeBase = () => {
  const { token } = useAuth();
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadKnowledgeBases = async () => {
    try {
      setIsLoading(true);
      const data = await knowledgeBaseService.getKnowledgeBases(token);
      setKnowledgeBases(data);
      setError(null);
    } catch (err) {
      setError('Failed to load knowledge bases');
    } finally {
      setIsLoading(false);
    }
  };

  const createKnowledgeBase = async (title) => {
    try {
      const newKnowledgeBase = await knowledgeBaseService.createKnowledgeBase(title, token);
      setKnowledgeBases([newKnowledgeBase, ...knowledgeBases]);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.title || 'Title already exists'
      };
    }
  };

  const deleteKnowledgeBase = async (id) => {
    try {
      await knowledgeBaseService.deleteKnowledgeBase(id, token);
      setKnowledgeBases(knowledgeBases.filter(kb => kb.id !== id));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: 'Failed to delete knowledge base'
      };
    }
  };

  const renameKnowledgeBase = async (id, newTitle) => {
    try {
      const updatedKnowledgeBase = await knowledgeBaseService.renameKnowledgeBase(id, newTitle, token);
      setKnowledgeBases(knowledgeBases.map(kb => 
        kb.id === id ? { ...kb, title: newTitle } : kb
      ));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.title || 'Failed to rename knowledge base'
      };
    }
  };

  useEffect(() => {
    loadKnowledgeBases();
  }, [token]);

  return {
    knowledgeBases,
    isLoading,
    error,
    createKnowledgeBase,
    deleteKnowledgeBase,
    renameKnowledgeBase
  };
}; 