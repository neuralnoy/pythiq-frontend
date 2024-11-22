import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import { 
  DocumentIcon, 
  ArrowDownTrayIcon,
  TrashIcon,
  PencilIcon,
  ClockIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { documentService } from '../../services/documentService';
import FileIcon from '../common/FileIcon';
import ConfirmationModal from '../common/ConfirmationModal';
import { formatFileSize } from '../../utils/formatters';
import { toast } from 'react-hot-toast';
import PlayCircleIcon from '@heroicons/react/24/solid/PlayCircleIcon';

const DocumentsTable = ({ knowledgeBaseId, token, shouldRefresh }) => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [documentToRename, setDocumentToRename] = useState(null);
  const [newName, setNewName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState([]);

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

  const filteredDocuments = documents
    .filter(doc => doc.name.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments, shouldRefresh]);

  const handleRenameClick = (doc) => {
    setDocumentToRename(doc);
    setNewName(doc.name);
  };

  const handleRenameConfirm = async () => {
    if (!newName.trim() || newName === documentToRename.name) {
      setDocumentToRename(null);
      return;
    }

    try {
      const updatedDoc = await documentService.renameDocument(
        knowledgeBaseId,
        documentToRename.id,
        newName,
        token
      );
      
      setDocuments(documents.map(d => 
        d.id === documentToRename.id ? updatedDoc : d
      ));
      
      toast.success('Document renamed successfully');
    } catch (error) {
      console.error('Failed to rename document:', error);
      toast.error(error.message || 'Failed to rename document');
    } finally {
      setDocumentToRename(null);
    }
  };

  const handleDeleteClick = (doc) => {
    setDocumentToDelete(doc);
  };

  const handleDeleteConfirm = async () => {
    try {
      await documentService.deleteDocument(knowledgeBaseId, documentToDelete.id, token);
      setDocuments(documents.filter(d => d.id !== documentToDelete.id));
      setDocumentToDelete(null);
      toast.success('Document deleted successfully');
    } catch (error) {
      console.error('Failed to delete document:', error);
      toast.error('Failed to delete document');
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

  const renderParsingStatus = (status, docId) => {
    switch (status) {
      case 'done':
        return (
          <div className="flex items-center">
            <CheckCircleIcon className="w-5 h-5 text-success" />
          </div>
        );
      case 'processing':
        return (
          <div className="flex items-center">
            <span className="loading loading-spinner loading-sm text-info"></span>
          </div>
        );
      default:
        return (
          <button
            className="text-success hover:text-success/80 transition-colors"
            onClick={() => handleParseDocument(docId)}
          >
            <PlayCircleIcon className="h-5 w-5" />
          </button>
        );
    }
  };

  const handleBulkEnable = async () => {
    try {
      await Promise.all(
        selectedDocuments.map(docId =>
          documentService.toggleDocumentEnabled(knowledgeBaseId, docId, token, true)
        )
      );
      await loadDocuments();
      setSelectedDocuments([]);
      toast.success('Documents enabled successfully');
    } catch (error) {
      toast.error('Failed to enable documents');
    }
  };

  const handleBulkDisable = async () => {
    try {
      await Promise.all(
        selectedDocuments.map(docId =>
          documentService.toggleDocumentEnabled(knowledgeBaseId, docId, token, false)
        )
      );
      await loadDocuments();
      setSelectedDocuments([]);
      toast.success('Documents disabled successfully');
    } catch (error) {
      toast.error('Failed to disable documents');
    }
  };

  const handleBulkDelete = () => {
    setDocumentToDelete(selectedDocuments);
  };

  const handleBulkDeleteConfirm = async () => {
    try {
      await Promise.all(
        documentToDelete.map(docId =>
          documentService.deleteDocument(knowledgeBaseId, docId, token)
        )
      );
      setDocuments(documents.filter(d => !documentToDelete.includes(d.id)));
      setSelectedDocuments([]);
      toast.success('Documents deleted successfully');
    } catch (error) {
      toast.error('Failed to delete documents');
    }
    setDocumentToDelete(null);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDocuments(filteredDocuments.map(doc => doc.id));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleSelectDocument = (docId) => {
    setSelectedDocuments(prev => {
      if (prev.includes(docId)) {
        return prev.filter(id => id !== docId);
      }
      return [...prev, docId];
    });
  };

  const renderBulkActionsToolbar = () => {
    if (selectedDocuments.length === 0) return null;

    return (
      <div className="flex items-center gap-2 mb-4 p-2 bg-base-200 rounded-lg">
        <span className="text-sm font-medium">
          {selectedDocuments.length} selected
        </span>
        <div className="flex-1" />
        <button
          onClick={handleBulkEnable}
          className="btn btn-sm btn-ghost"
          title="Enable selected"
        >
          <CheckCircleIcon className="w-4 h-4" />
        </button>
        <button
          onClick={handleBulkDisable}
          className="btn btn-sm btn-ghost"
          title="Disable selected"
        >
          <XCircleIcon className="w-4 h-4" />
        </button>
        <button
          onClick={handleBulkDelete}
          className="btn btn-sm btn-ghost text-error"
          title="Delete selected"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    );
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

  return (
    <div className="space-y-4">
      {renderBulkActionsToolbar()}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="input input-bordered w-full pl-10"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <div className="overflow-x-auto">
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
            <table className="table w-full">
              <thead className="sticky top-0 bg-base-100 z-10">
                <tr>
                  <th className="w-4 p-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={selectedDocuments.length === filteredDocuments.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-2">Name</th>
                  <th className="w-20 p-2">Size</th>
                  <th className="w-28 p-2">Enabled</th>
                  <th className="w-16 p-2">Status</th>
                  <th className="w-16 p-2">Pages</th>
                  <th className="w-28 p-2">Uploaded</th>
                  <th className="w-28 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      {documents.length === 0 ? (
                        <div className="text-gray-500">
                          No documents uploaded yet
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          No documents match your search
                        </div>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover">
                      <td className="p-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={selectedDocuments.includes(doc.id)}
                          onChange={() => handleSelectDocument(doc.id)}
                        />
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <FileIcon filename={doc.name} className="w-5 h-5 flex-shrink-0" />
                          <span className="truncate max-w-xs font-medium">{doc.name}</span>
                        </div>
                      </td>
                      <td className="p-2 w-20">
                        {formatFileSize(doc.size)}
                      </td>
                      <td className="p-2 w-28">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="toggle toggle-primary toggle-sm"
                            checked={doc.enabled}
                            onChange={() => handleToggleEnable(doc.id)}
                          />
                          <span className="ml-2">{doc.enabled ? 'Yes' : 'No'}</span>
                        </div>
                      </td>
                      <td className="p-2 w-16">
                        <div className="flex justify-center">
                          {renderParsingStatus(doc.parsing_status, doc.id)}
                        </div>
                      </td>
                      <td className="p-2 w-16">
                        <div className="flex justify-center">
                          {doc.parsed_pages || 0}
                        </div>
                      </td>
                      <td className="p-2 w-28">
                        {format(parseISO(doc.uploaded_at), 'MMM d, yyyy')}
                      </td>
                      <td className="p-1 w-24">
                        <div className="flex items-center justify-center gap-1">
                          <button 
                            onClick={() => handleRenameClick(doc)} 
                            className="btn btn-sm btn-ghost" 
                            title="Rename"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDownload(doc)} 
                            className="btn btn-sm btn-ghost" 
                            title="Download"
                          >
                            <ArrowDownTrayIcon className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(doc)} 
                            className="btn btn-sm btn-ghost text-error" 
                            title="Delete"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={!!documentToDelete}
        onClose={() => setDocumentToDelete(null)}
        onConfirm={Array.isArray(documentToDelete) ? handleBulkDeleteConfirm : handleDeleteConfirm}
        title="Delete Documents"
        message={Array.isArray(documentToDelete) 
          ? `Are you sure you want to delete ${documentToDelete.length} documents? This action cannot be undone.`
          : `Are you sure you want to delete "${documents.find(d => d.id === documentToDelete)?.name}"? This action cannot be undone.`
        }
      />

      <div className={`modal ${documentToRename ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Rename Document</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleRenameConfirm();
          }}>
            <div className="form-control">
              <input
                type="text"
                className="input input-bordered"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new name"
                autoFocus
              />
            </div>
            <div className="modal-action">
              <button 
                type="button"
                className="btn" 
                onClick={() => setDocumentToRename(null)}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="btn btn-primary"
                disabled={!newName.trim() || newName === documentToRename?.name}
              >
                Rename
              </button>
            </div>
          </form>
        </div>
        <div className="modal-backdrop" onClick={() => setDocumentToRename(null)}>
          <button className="cursor-default">Close</button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsTable; 