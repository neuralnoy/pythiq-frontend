import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useKnowledgeBase } from '../../hooks/useKnowledgeBase';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const CreateChatModal = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedKbs, setSelectedKbs] = useState([]);
  const { knowledgeBases } = useKnowledgeBase();
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setSelectedKbs([]);
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Chat name is required');
      return;
    }

    if (selectedKbs.length === 0) {
      setError('Please select at least one knowledge base');
      return;
    }

    try {
      await onCreate({
        title: title.trim(),
        description: description.trim(),
        knowledgeBaseIds: selectedKbs
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create chat');
    }
  };

  const toggleKnowledgeBase = (kbId) => {
    setSelectedKbs(prev => {
      if (prev.includes(kbId)) {
        return prev.filter(id => id !== kbId);
      }
      return [...prev, kbId];
    });
  };

  const removeKnowledgeBase = (e, kbId) => {
    e.stopPropagation(); // Prevent dropdown from opening
    setSelectedKbs(prev => prev.filter(id => id !== kbId));
  };

  const getSelectedKbTitles = () => {
    return selectedKbs.map(kbId => {
      const kb = knowledgeBases.find(kb => kb.id === kbId);
      return kb ? kb.title : '';
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Create New Chat</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control gap-4">
            <div>
              <label className="label">
                <span className="label-text">Chat Name *</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter chat name"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Description</span>
                <span className="label-text-alt text-gray-500">Optional</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter chat description"
                rows={3}
              />
            </div>

            <div className="relative">
              <label className="label">
                <span className="label-text">Knowledge Bases *</span>
              </label>
              <div 
                className="dropdown w-full"
                tabIndex={0}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setIsDropdownOpen(false);
                  }
                }}
              >
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="input input-bordered w-full min-h-[2.5rem] flex items-center cursor-pointer relative"
                >
                  <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-1 px-1 w-full">
                    {selectedKbs.length === 0 ? (
                      <span className="text-gray-500">Select knowledge bases</span>
                    ) : (
                      <>
                        {getSelectedKbTitles().map((title, index) => (
                          <div
                            key={selectedKbs[index]}
                            className="bg-primary text-primary-content px-2 py-1 flex items-center gap-1 rounded shrink-0"
                          >
                            <span className="truncate max-w-[100px]">{title}</span>
                            <button
                              type="button"
                              onClick={(e) => removeKnowledgeBase(e, selectedKbs[index])}
                              className="hover:bg-primary-focus rounded p-0.5"
                            >
                              <XMarkIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                {isDropdownOpen && (
                  <div className="absolute bottom-full left-0 right-0 bg-base-100 w-full p-2 shadow rounded-lg mb-1 max-h-60 overflow-auto">
                    {knowledgeBases.length === 0 ? (
                      <div className="text-sm text-gray-500 p-2">No knowledge bases available</div>
                    ) : (
                      knowledgeBases.map((kb) => (
                        <button
                          key={kb.id}
                          type="button"
                          className="flex items-center justify-between w-full p-2 hover:bg-base-200 rounded-lg"
                          onClick={() => toggleKnowledgeBase(kb.id)}
                        >
                          <span>{kb.title}</span>
                          {selectedKbs.includes(kb.id) && (
                            <CheckIcon className="w-5 h-5 text-primary" />
                          )}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="alert alert-error mt-4">
              <span>{error}</span>
            </div>
          )}

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Chat
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}>
        <button className="cursor-default">Close</button>
      </div>
    </div>
  );
};

CreateChatModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
};

export default CreateChatModal;