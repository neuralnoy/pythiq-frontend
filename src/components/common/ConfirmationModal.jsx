import PropTypes from 'prop-types';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        <p className="mb-4">{message}</p>
        <div className="modal-action">
          <button 
            className="btn" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="btn btn-error" 
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}>
        <button className="cursor-default">Close</button>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default ConfirmationModal; 