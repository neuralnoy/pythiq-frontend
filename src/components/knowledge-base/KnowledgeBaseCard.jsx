import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { formatInTimeZone } from 'date-fns-tz';
import { parseISO } from 'date-fns';
import ConfirmationModal from '../common/ConfirmationModal';

const KnowledgeBaseCard = ({ knowledgeBase, onDelete, onRename }) => {
  const navigate = useNavigate();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(knowledgeBase.title);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const formattedDate = formatInTimeZone(
    parseISO(knowledgeBase.created_at),
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    'MMM d, yyyy • h:mm a'
  );

  const truncateText = (text, maxLength = 30) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const handleRename = async () => {
    if (newTitle.trim() === '') return;
    const success = await onRename(knowledgeBase.id, newTitle);
    if (success) {
      setIsRenaming(false);
    }
  };

  return (
    <>
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <div className="card-body">
          <div className="flex justify-between items-start gap-4">
            {isRenaming ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  className="input input-bordered flex-1"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  autoFocus
                />
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={handleRename}
                >
                  Save
                </button>
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    setIsRenaming(false);
                    setNewTitle(knowledgeBase.title);
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h2 className="card-title text-xl font-bold flex-1" title={knowledgeBase.title}>
                  {truncateText(knowledgeBase.title)}
                </h2>
                <div className="flex gap-2">
                  <button 
                    className="btn btn-ghost btn-sm"
                    onClick={() => setIsRenaming(true)}
                  >
                    <PencilSquareIcon className="w-4 h-4" />
                  </button>
                  <button 
                    className="btn btn-ghost btn-sm text-error"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            Created: {formattedDate}
          </p>
          <div className="card-actions justify-end mt-4">
            <button
              onClick={() => navigate(`/knowledge/${knowledgeBase.id}`)}
              className="btn btn-primary w-full"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => onDelete(knowledgeBase.id)}
        title="Delete Knowledge Base"
        message={`Are you sure you want to delete "${knowledgeBase.title}"? This action cannot be undone.`}
      />
    </>
  );
};

KnowledgeBaseCard.propTypes = {
  knowledgeBase: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired
};

export default KnowledgeBaseCard; 