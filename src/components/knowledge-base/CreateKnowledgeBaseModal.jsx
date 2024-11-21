import PropTypes from 'prop-types';
import { useState } from 'react';

const CreateKnowledgeBaseModal = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const result = await onCreate(title);
    if (result.success) {
      setTitle('');
      onClose();
    } else {
      setError(result.error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Create New Bookshelf</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}
            <input
              type="text"
              placeholder="Enter title"
              className="input input-bordered"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="modal-action">
            <button 
              type="button" 
              className="btn" 
              onClick={() => {
                setError(null);
                setTitle('');
                onClose();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create
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

CreateKnowledgeBaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
};

export default CreateKnowledgeBaseModal; 