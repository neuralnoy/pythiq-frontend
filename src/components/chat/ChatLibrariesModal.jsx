import { useEffect, useState } from 'react';
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { documentService } from '../../services/documentService';
import { knowledgeBaseService } from '../../services/knowledgeBaseService';

const ChatLibrariesModal = ({ isOpen, onClose, knowledgeBaseIds }) => {
  const [libraryDocuments, setLibraryDocuments] = useState({});
  const [knowledgeBases, setKnowledgeBases] = useState({});
  const [errors, setErrors] = useState({});
  const [documentErrors, setDocumentErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen || !knowledgeBaseIds?.length) return;
      
      setIsLoading(true);
      setErrors({});
      setDocumentErrors({});
      try {
        // Fetch all knowledge bases first
        const allKnowledgeBases = await knowledgeBaseService.getKnowledgeBases();
        const kbMap = {};
        allKnowledgeBases.forEach(kb => {
          kbMap[kb.id] = kb;
        });
        setKnowledgeBases(kbMap);

        // Then fetch documents for each knowledge base
        const documents = {};
        const newErrors = {};
        const newDocErrors = {};
        
        for (const kbId of knowledgeBaseIds) {
          try {
            if (!kbMap[kbId]) {
              newErrors[kbId] = 'Bookshelf no longer exists';
              continue;
            }
            const docs = await documentService.getDocuments(kbId);
            const enabledDocs = docs.filter(doc => doc.enabled);
            const disabledDocs = docs.filter(doc => !doc.enabled);
            
            if (disabledDocs.length > 0) {
              newDocErrors[kbId] = {
                type: 'disabled',
                count: disabledDocs.length,
                message: `${disabledDocs.length} document${disabledDocs.length > 1 ? 's' : ''} disabled`
              };
            }
            
            if (docs.length === 0) {
              newDocErrors[kbId] = {
                type: 'deleted',
                message: 'All documents have been deleted'
              };
            } else if (enabledDocs.length === 0) {
              newDocErrors[kbId] = {
                type: 'all_disabled',
                message: 'All documents are disabled'
              };
            }
            
            documents[kbId] = enabledDocs;
          } catch (error) {
            console.error(`Failed to fetch documents for bookshelf ${kbId}:`, error);
            newErrors[kbId] = 'Failed to load documents';
          }
        }
        
        setLibraryDocuments(documents);
        setErrors(newErrors);
        setDocumentErrors(newDocErrors);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isOpen, knowledgeBaseIds]);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Chat Bookshelves</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : (
          <div className="space-y-6">
            {knowledgeBaseIds.map((kbId) => (
              <div key={kbId} className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-primary">
                    {knowledgeBases[kbId]?.title || 'Unknown Bookshelf'}
                  </h4>
                  {(errors[kbId] || documentErrors[kbId]) && (
                    <div className="tooltip" data-tip={errors[kbId] || documentErrors[kbId]?.message}>
                      <ExclamationTriangleIcon className="w-5 h-5 text-warning" />
                    </div>
                  )}
                </div>
                <div className="pl-4 space-y-1">
                  {errors[kbId] ? (
                    <p className="text-sm text-warning">{errors[kbId]}</p>
                  ) : documentErrors[kbId]?.type === 'deleted' || documentErrors[kbId]?.type === 'all_disabled' ? (
                    <p className="text-sm text-warning">{documentErrors[kbId].message}</p>
                  ) : (
                    <>
                      {libraryDocuments[kbId]?.map(doc => (
                        <div key={doc.id} className="text-sm">
                          • {doc.name}
                        </div>
                      ))}
                      {documentErrors[kbId]?.type === 'disabled' && (
                        <p className="text-sm text-warning mt-2">
                          {documentErrors[kbId].message}
                        </p>
                      )}
                      {(!libraryDocuments[kbId] || libraryDocuments[kbId].length === 0) && !documentErrors[kbId] && (
                        <p className="text-sm text-gray-500">No enabled documents</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}>
        <button className="cursor-default">Close</button>
      </div>
    </div>
  );
};

export default ChatLibrariesModal; 