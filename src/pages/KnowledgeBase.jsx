import { useState, useEffect } from 'react';
import { RectangleStackIcon, PlusIcon, ServerStackIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useKnowledgeBase } from '../hooks/useKnowledgeBase';
import KnowledgeBaseCard from '../components/knowledge-base/KnowledgeBaseCard';
import CreateKnowledgeBaseModal from '../components/knowledge-base/CreateKnowledgeBaseModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';

const ITEMS_PER_PAGE = 6;

const KnowledgeBase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { knowledgeBases, isLoading, createKnowledgeBase, deleteKnowledgeBase, renameKnowledgeBase } = useKnowledgeBase();

  const filteredKnowledgeBases = knowledgeBases
    .filter(kb => kb.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const totalPages = Math.ceil(filteredKnowledgeBases.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedKnowledgeBases = filteredKnowledgeBases.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="form-control w-full sm:w-96">
          <div className="relative">
            <input
              type="text"
              placeholder="Search your bookshelves..."
              className="input input-bordered w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <button
          className="btn btn-primary btn-sm whitespace-nowrap"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusIcon className="w-4 h-4" />
          <RectangleStackIcon className="w-5 h-5" />
          Add New Bookshelf
        </button>
      </div>

      {filteredKnowledgeBases.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <RectangleStackIcon className="w-24 h-24 text-gray-400 mb-4" />
          <p className="text-xl text-gray-500">
            {searchQuery ? "No matching bookshelf found" : "No bookshelf found"}
          </p>
          {!searchQuery && (
            <p className="text-gray-400">Click the button above to create your first bookshelf</p>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedKnowledgeBases.map((kb) => (
              <KnowledgeBaseCard
                key={kb.id}
                knowledgeBase={kb}
                onDelete={handleDelete}
                onRename={handleRename}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
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
