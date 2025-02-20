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
  XCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { documentService } from '../../services/documentService';
import FileIcon from '../common/FileIcon';
import ConfirmationModal from '../common/ConfirmationModal';
import { formatFileSize } from '../../utils/formatters';
import { toast } from 'react-hot-toast';
import PlayCircleIcon from '@heroicons/react/24/solid/PlayCircleIcon';
import LoadingSpinner from '../common/LoadingSpinner';
import { PlayIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import ParsingStatus from '../documents/ParsingStatus';

const DocumentsTable = ({ knowledgeBaseId, token, shouldRefresh }) => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [documentToDelete, setDocumentToDelete] = useState(null);
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
    
    // Cleanup any polling intervals when component unmounts
    return () => {
      const intervals = window.intervals || [];
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [knowledgeBaseId, shouldRefresh]);

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

  const handleBulkEnable = async () => {
    try {
      // Only enable documents that are currently disabled
      const documentsToEnable = documents
        .filter(doc => selectedDocuments.includes(doc.id) && !doc.enabled)
        .map(doc => doc.id);

      if (documentsToEnable.length === 0) {
        toast.info('All selected documents are already enabled');
        return;
      }

      await Promise.all(
        documentsToEnable.map(docId =>
          documentService.toggleDocumentEnabled(knowledgeBaseId, docId)
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
      // Only disable documents that are currently enabled
      const documentsToDisable = documents
        .filter(doc => selectedDocuments.includes(doc.id) && doc.enabled)
        .map(doc => doc.id);

      if (documentsToDisable.length === 0) {
        toast.info('All selected documents are already disabled');
        return;
      }

      await Promise.all(
        documentsToDisable.map(docId =>
          documentService.toggleDocumentEnabled(knowledgeBaseId, docId)
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
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No documents</h3>
        <p className="mt-1 text-sm text-gray-500">
          Upload documents to get started
        </p>

        <div className="mt-12 w-full max-w-5xl mx-auto">
          <h4 className="text-lg font-semibold text-center mb-8">How to manage your documents:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="card-title text-lg">Upload Documents</h3>
                </div>
                <p className="text-gray-600">Upload documents that are relevant to this bookshelf's topic for better organization</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="card-title text-lg">Processing</h3>
                </div>
                <p className="text-gray-600">Documents will be processed automatically. For documents with images, our LLM Vision model will be used, consuming tokens. Monitor usage in your dashboard and wait for the "Ready" status.</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="card-title text-lg">Enable/Disable</h3>
                </div>
                <p className="text-gray-600">Choose which documents to include in your chat sessions by toggling them on or off in the document list</p>
              </div>
            </div>
          </div>
        </div>
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
                  <th className="w-28 p-2">Document Status</th>
                  <th className="w-44 p-2">Uploaded</th>
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
                      <td className="p-2 w-28">
                        <ParsingStatus 
                          document={doc} 
                          onStatusChange={(newStatus) => {
                            setDocuments(docs => 
                              docs.map(d => d.id === doc.id ? {...d, parsing_status: newStatus} : d)
                            );
                          }} 
                        />
                      </td>
                      <td className="p-2 w-44">
                        {format(parseISO(doc.uploaded_at), 'MMM d, yyyy • h:mm a')}
                      </td>
                      <td className="p-1 w-24">
                        <div className="flex items-center justify-center gap-1">
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
          : `Are you sure you want to delete "${documentToDelete?.name}"? This action cannot be undone.`
        }
      />
    </div>
  );
};

export default DocumentsTable; 