import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { 
  DocumentIcon, 
  TrashIcon,
  ArrowDownTrayIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { documentService } from '../../services/documentService';
import DocumentModal from './DocumentModal';

const DocumentsTable = ({ knowledgeBaseId, token, shouldRefresh }) => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [documentToRename, setDocumentToRename] = useState(null);
  const [newName, setNewName] = useState('');

  const MAX_FILENAME_LENGTH = 30;
  const MAX_INPUT_LENGTH = 50;

  const loadDocuments = useCallback(async () => {
    try {
      const data = await documentService.getDocuments(knowledgeBaseId, token);
      const sortedDocuments = data.sort((a, b) => 
        new Date(b.uploaded_at) - new Date(a.uploaded_at)
      );
      setDocuments(sortedDocuments);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setIsLoading(false);
    }
  }, [knowledgeBaseId, token]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments, shouldRefresh]);

  const handleRenameClick = (doc) => {
    setDocumentToRename(doc);
    setNewName(doc.name);
  };

  const handleRenameConfirm = async () => {
    if (!newName.trim() || newName === documentToRename.name) return;

    try {
      await documentService.renameDocument(knowledgeBaseId, documentToRename.id, newName, token);
      setDocuments(documents.map(d => 
        d.id === documentToRename.id ? { ...d, name: newName } : d
      ));
    } catch (error) {
      console.error('Failed to rename document:', error);
      alert('Failed to rename document');
    }
  };

  const handleDeleteClick = (doc) => {
    setDocumentToDelete(doc);
  };

  const handleDeleteConfirm = async () => {
    try {
      await documentService.deleteDocument(knowledgeBaseId, documentToDelete.id, token);
      setDocuments(documents.filter(d => d.id !== documentToDelete.id));
    } catch (error) {
      console.error('Failed to delete document:', error);
      alert('Failed to delete document');
    }
  };

  const handleDownload = async (doc) => {
    try {
      await documentService.getDownloadUrl(knowledgeBaseId, doc.id, token);
    } catch (error) {
      console.error('Failed to download document:', error);
      alert('Failed to download document');
    }
  };

  const handleToggleEnable = async (docId) => {
    try {
      const updatedDoc = await documentService.toggleDocumentEnabled(knowledgeBaseId, docId, token);
      setDocuments(documents.map(d => 
        d.id === docId ? { ...d, enabled: updatedDoc.enabled } : d
      ));
    } catch (error) {
      console.error('Failed to toggle document:', error);
      alert('Failed to toggle document status');
    }
  };

  if (isLoading) {
    return <div className="loading loading-spinner loading-lg"></div>;
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No documents</h3>
        <p className="mt-1 text-sm text-gray-500">
          Upload documents to get started
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="w-[300px]">Name</th>
            <th>Upload Date</th>
            <th>Enable</th>
            <th>Parsing Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td className="font-medium">
                <div className="tooltip" data-tip={doc.name}>
                  <span className="block truncate max-w-[280px]">
                    {doc.name.length > MAX_FILENAME_LENGTH 
                      ? `${doc.name.slice(0, MAX_FILENAME_LENGTH)}...` 
                      : doc.name
                    }
                  </span>
                </div>
              </td>
              <td>{formatDate(doc.uploaded_at)}</td>
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={doc.enabled}
                  onChange={() => handleToggleEnable(doc.id)}
                />
              </td>
              <td>
                <span className={`badge ${getStatusBadgeColor(doc.parsing_status)}`}>
                  {doc.parsing_status || 'Pending'}
                </span>
              </td>
              <td>
                <div className="flex gap-2">
                  <button 
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleRenameClick(doc)}
                    title="Rename"
                  >
                    <PencilSquareIcon className="h-4 w-4" />
                  </button>
                  <button 
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleDownload(doc)}
                    title="Download"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" />
                  </button>
                  <button 
                    className="btn btn-ghost btn-sm text-error"
                    onClick={() => handleDeleteClick(doc)}
                    title="Delete"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DocumentModal
        isOpen={!!documentToRename}
        onClose={() => {
          setDocumentToRename(null);
          setNewName('');
        }}
        onConfirm={handleRenameConfirm}
        title="Rename Document"
        confirmText="Save"
        type="primary"
      >
        <div className="form-control">
          <input
            type="text"
            className="input input-bordered w-full"
            value={newName}
            onChange={(e) => setNewName(e.target.value.slice(0, MAX_INPUT_LENGTH))}
            placeholder="Enter new name"
            maxLength={MAX_INPUT_LENGTH}
            autoFocus
          />
          <label className="label">
            <span className="label-text-alt">
              {newName.length}/{MAX_INPUT_LENGTH} characters
            </span>
          </label>
        </div>
      </DocumentModal>

      <DocumentModal
        isOpen={!!documentToDelete}
        onClose={() => setDocumentToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Document"
        message={`Are you sure you want to delete "${documentToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        type="error"
      />
    </div>
  );
};

const getStatusBadgeColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'badge-success';
    case 'processing':
      return 'badge-warning';
    case 'failed':
      return 'badge-error';
    default:
      return 'badge-ghost';
  }
};

DocumentsTable.propTypes = {
  knowledgeBaseId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  shouldRefresh: PropTypes.number
};

export default DocumentsTable; 