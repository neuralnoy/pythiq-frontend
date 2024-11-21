import { useState } from 'react';
import PropTypes from 'prop-types';
import { documentService } from '../../services/documentService';
import { getAcceptedFileTypes, formatFileTypes } from '../../utils/fileTypes';

const DocumentUploadModal = ({ isOpen, onClose, onUploadSuccess, knowledgeBaseId, token }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      const uploadPromises = files.map(async (file) => {
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: 0
        }));
        
        try {
          await documentService.uploadDocument(knowledgeBaseId, file, token);
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: 100
          }));
          return { success: true, file: file.name };
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error);
          return { success: false, file: file.name, error: error.message };
        }
      });

      const results = await Promise.all(uploadPromises);
      const failures = results.filter(r => !r.success);
      
      if (failures.length > 0) {
        console.error('Some files failed to upload:', failures);
      }
      
      if (results.some(r => r.success)) {
        onUploadSuccess();
      }
      
      setFiles([]);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      setUploadProgress({});
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
              accept={getAcceptedFileTypes()}
              onChange={(e) => setFiles(Array.from(e.target.files))}
              multiple
              required
            />
            <div className="text-sm text-gray-500 mt-2">
              <p className="mb-1">Supported formats:</p>
              <p className="font-mono text-xs leading-relaxed">
                {formatFileTypes()}
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map(file => (
                <div key={file.name} className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span>{file.name}</span>
                    <span>{uploadProgress[file.name] || 0}%</span>
                  </div>
                  <progress 
                    className="progress progress-primary w-full" 
                    value={uploadProgress[file.name] || 0} 
                    max="100"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className={`btn btn-primary ${uploading ? 'loading' : ''}`}
              disabled={uploading || files.length === 0}
            >
              Upload {files.length > 0 ? `(${files.length} files)` : ''}
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