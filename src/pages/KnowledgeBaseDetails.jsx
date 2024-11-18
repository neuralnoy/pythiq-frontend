import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useKnowledgeBase } from '../hooks/useKnowledgeBase';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DocumentUploadModal from '../components/knowledge-base/DocumentUploadModal';
import DocumentsTable from '../components/knowledge-base/DocumentsTable';

const KnowledgeBaseDetails = () => {
  const { id } = useParams();
  const { getKnowledgeBaseById } = useKnowledgeBase();
  const [knowledgeBase, setKnowledgeBase] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    const loadKnowledgeBase = async () => {
      try {
        const data = await getKnowledgeBaseById(id);
        setKnowledgeBase(data);
      } catch (error) {
        console.error('Failed to load knowledge base:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadKnowledgeBase();
  }, [id, getKnowledgeBaseById]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{knowledgeBase?.title}</h1>
        <button
          className="btn btn-primary btn-sm whitespace-nowrap"
          onClick={() => setIsUploadModalOpen(true)}
        >
          <DocumentPlusIcon className="w-5 h-5 mr-2" />
          Upload Document
        </button>
      </div>

      <DocumentsTable knowledgeBaseId={id} />

      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        knowledgeBaseId={id}
      />
    </div>
  );
};

export default KnowledgeBaseDetails; 