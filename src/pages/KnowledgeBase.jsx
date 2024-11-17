import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { knowledgeBaseService } from '../services/knowledgeBaseService';
import { DocumentPlusIcon, ServerStackIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const KnowledgeBase = () => {
  const { token } = useAuth();
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadKnowledgeBases();
  }, [token]);

  const loadKnowledgeBases = async () => {
    try {
      setIsLoading(true);
      const data = await knowledgeBaseService.getKnowledgeBases(token);
      setKnowledgeBases(data);
    } catch (err) {
      console.error('Error loading knowledge bases:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setShowError(true);
    try {
      const newKnowledgeBase = await knowledgeBaseService.createKnowledgeBase(newTitle, token);
      setKnowledgeBases([newKnowledgeBase, ...knowledgeBases]);
      setNewTitle('');
      setIsModalOpen(false);
      setError(null);
      setShowError(false);
    } catch (err) {
      setError(err.response?.data?.title || 'A knowledge base with this name already exists for your account');
    }
  };

  const handleDelete = async (id) => {
    setShowError(true);
    try {
      await knowledgeBaseService.deleteKnowledgeBase(id, token);
      setKnowledgeBases(knowledgeBases.filter(kb => kb.id !== id));
      setError(null);
      setShowError(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setError(null);
    setShowError(false);
    setNewTitle('');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end items-center mb-8">
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <DocumentPlusIcon className="w-5 h-5 mr-2" />
          Add New Knowledge Base
        </button>
      </div>

      {showError && error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {knowledgeBases.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <ServerStackIcon className="w-24 h-24 text-gray-400 mb-4" />
          <p className="text-xl text-gray-500">No knowledge bases found</p>
          <p className="text-gray-400">Click the button above to create your first knowledge base</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {knowledgeBases.map((kb) => (
            <div key={kb.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <h2 className="card-title text-xl font-bold">{kb.title}</h2>
                <p className="text-sm text-gray-500">
                  Created: {format(new Date(kb.created_at), 'MMM d, yyyy')}
                </p>
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => navigate(`/knowledge-bases/${kb.id}`)}
                    className="btn btn-primary"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDelete(kb.id)}
                    className="btn btn-error btn-outline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Create New Knowledge Base</h3>
            <form onSubmit={handleAdd}>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Enter title"
                  className="input input-bordered"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>
              <div className="modal-action">
                <button type="button" className="btn" onClick={handleModalClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={handleModalClose}>
            <button className="cursor-default">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;
