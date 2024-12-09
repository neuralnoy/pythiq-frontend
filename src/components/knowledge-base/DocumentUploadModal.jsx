import { useState } from 'react';
import PropTypes from 'prop-types';
import { documentService } from '../../services/documentService';
import { getAcceptedFileTypes, formatFileTypes } from '../../utils/fileTypes';
import LoadingSpinner from '../common/LoadingSpinner';

const DocumentUploadModal = ({ isOpen, onClose, onUploadSuccess, knowledgeBaseId, token }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [error, setError] = useState('');

  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const oversizedFiles = selectedFiles.filter(file => file.size > MAX_FILE_SIZE);
    
    if (oversizedFiles.length > 0) {
      setError(`File size too large: ${oversizedFiles.map(f => f.name).join(', ')}. Maximum size is 20MB.`);
      e.target.value = ''; // Reset file input
      return;
    }
    
    setError('');
    setFiles(selectedFiles);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');
    
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
        setError(`Failed to upload: ${failures.map(f => f.file).join(', ')}`);
      }
      
      if (results.some(r => r.success)) {
        onUploadSuccess();
      }
      
      setFiles([]);
    } catch (error) {
      console.error('Upload failed:', error);
      setError('Upload failed: ' + error.message);
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
              onChange={handleFileChange}
              multiple
              required
            />
            <div className="text-sm text-gray-500 mt-2">
              <p className="mb-1">Supported formats:</p>
              <p className="font-mono text-xs leading-relaxed">
                {formatFileTypes()}
              </p>
              <p className="text-xs mt-1">Maximum file size: 20MB</p>
            </div>
          </div>

          {error && (
            <div className="alert alert-error mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}

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
              className="btn btn-primary"
              disabled={uploading || files.length === 0}
            >
              {uploading ? <LoadingSpinner size="sm" /> : null}
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