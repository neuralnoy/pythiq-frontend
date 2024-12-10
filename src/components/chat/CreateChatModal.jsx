import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useKnowledgeBase } from '../../hooks/useKnowledgeBase';

const CreateChatModal = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedKbs, setSelectedKbs] = useState([]);
  const { knowledgeBases } = useKnowledgeBase();
  const [error, setError] = useState('');

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

            <div>
              <label className="label">
                <span className="label-text">Knowledge Bases *</span>
              </label>
              <select
                className="select select-bordered w-full"
                multiple
                value={selectedKbs}
                onChange={(e) => setSelectedKbs([...e.target.selectedOptions].map(option => option.value))}
                required
              >
                {knowledgeBases.map((kb) => (
                  <option key={kb.id} value={kb.id}>
                    {kb.title}
                  </option>
                ))}
              </select>
              <label className="label">
                <span className="label-text-alt text-gray-500">Hold Ctrl/Cmd to select multiple</span>
              </label>
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