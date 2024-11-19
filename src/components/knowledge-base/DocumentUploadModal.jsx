import { useState } from 'react';
import PropTypes from 'prop-types';
import { documentService } from '../../services/documentService';

const DocumentUploadModal = ({ isOpen, onClose, onUploadSuccess, knowledgeBaseId, token }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      await documentService.uploadDocument(knowledgeBaseId, files[0], token);
      setFiles([]);
      onUploadSuccess();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Upload Documents</h3>
        <form onSubmit={handleUpload}>
          <div className="form-control">
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              accept=".pdf,.doc,.docx,.xlsx,.ppt,.txt"
              onChange={(e) => setFiles(Array.from(e.target.files))}
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: PDF, DOCX, EXCEL, PPT, TXT
            </p>
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className={`btn btn-primary ${uploading ? 'loading' : ''}`}
              disabled={uploading || files.length === 0}
            >
              Upload
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

DocumentUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUploadSuccess: PropTypes.func.isRequired,
  knowledgeBaseId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

export default DocumentUploadModal; 