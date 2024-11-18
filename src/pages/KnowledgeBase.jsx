import { useState } from 'react';
import { DocumentPlusIcon, ServerStackIcon } from '@heroicons/react/24/outline';
import { useKnowledgeBase } from '../hooks/useKnowledgeBase';
import KnowledgeBaseCard from '../components/knowledge-base/KnowledgeBaseCard';
import CreateKnowledgeBaseModal from '../components/knowledge-base/CreateKnowledgeBaseModal';
import LoadingSpinner from '../components/common/LoadingSpinner';

const KnowledgeBase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { knowledgeBases, isLoading, createKnowledgeBase, deleteKnowledgeBase, renameKnowledgeBase } = useKnowledgeBase();

  const handleCreate = async (title) => {
    const result = await createKnowledgeBase(title);
    return result;
  };

  const handleDelete = async (id) => {
    await deleteKnowledgeBase(id);
  };

  const handleRename = async (id, newTitle) => {
    const result = await renameKnowledgeBase(id, newTitle);
    return result.success;
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end items-center mb-8">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setIsModalOpen(true)}
        >
          <DocumentPlusIcon className="w-5 h-5 mr-2" />
          Add New Knowledge Base
        </button>
      </div>

      {knowledgeBases.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <ServerStackIcon className="w-24 h-24 text-gray-400 mb-4" />
          <p className="text-xl text-gray-500">No knowledge bases found</p>
          <p className="text-gray-400">Click the button above to create your first knowledge base</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {knowledgeBases.map((kb) => (
            <KnowledgeBaseCard
              key={kb.id}
              knowledgeBase={kb}
              onDelete={handleDelete}
              onRename={handleRename}
            />
          ))}
        </div>
      )}

      <CreateKnowledgeBaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default KnowledgeBase;
