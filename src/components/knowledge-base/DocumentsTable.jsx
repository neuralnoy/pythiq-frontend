import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { 
  DocumentIcon, 
  TrashIcon,
  ArrowDownTrayIcon 
} from '@heroicons/react/24/outline';

const DocumentsTable = ({ knowledgeBaseId }) => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        // TODO: Implement API call to fetch documents
        setDocuments([]);
      } catch (error) {
        console.error('Failed to load documents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, [knowledgeBaseId]);

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
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Size</th>
            <th>Uploaded</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.name}</td>
              <td>{doc.type}</td>
              <td>{doc.size}</td>
              <td>{doc.uploadedAt}</td>
              <td>
                <div className="flex gap-2">
                  <button className="btn btn-ghost btn-sm">
                    <ArrowDownTrayIcon className="h-4 w-4" />
                  </button>
                  <button className="btn btn-ghost btn-sm text-error">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DocumentsTable.propTypes = {
  knowledgeBaseId: PropTypes.string.isRequired
};

export default DocumentsTable; 