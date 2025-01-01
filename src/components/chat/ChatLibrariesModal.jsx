import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { documentService } from '../../services/documentService';
import { knowledgeBaseService } from '../../services/knowledgeBaseService';

const ChatLibrariesModal = ({ isOpen, onClose, knowledgeBaseIds }) => {
  const [libraryDocuments, setLibraryDocuments] = useState({});
  const [knowledgeBases, setKnowledgeBases] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen || !knowledgeBaseIds?.length) return;
      
      setIsLoading(true);
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
        for (const kbId of knowledgeBaseIds) {
          const docs = await documentService.getDocuments(kbId);
          documents[kbId] = docs.filter(doc => doc.enabled);
        }
        setLibraryDocuments(documents);
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
                <h4 className="font-semibold text-primary">
                  {knowledgeBases[kbId]?.title || 'Unknown Bookshelf'}
                </h4>
                <div className="pl-4 space-y-1">
                  {!libraryDocuments[kbId] || libraryDocuments[kbId].length === 0 ? (
                    <p className="text-sm text-gray-500">No enabled documents</p>
                  ) : (
                    libraryDocuments[kbId].map(doc => (
                      <div key={doc.id} className="text-sm">
                        • {doc.name}
                      </div>
                    ))
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