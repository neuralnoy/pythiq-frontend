// src/pages/Chat.jsx
import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import CreateChatModal from '../components/chat/CreateChatModal';

const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreateChat = async (chatData) => {
    // TODO: Implement chat creation logic
    console.log('Creating chat:', chatData);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex relative mt-4">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-60' : 'w-16'} sticky top-4 border-r border-base-200 h-[calc(100vh-4rem)]`}>
        <div className={`absolute inset-y-0 transition-all duration-300 ${isSidebarOpen ? 'left-0' : '-left-64'} w-60`}>
          <div className={`flex flex-col h-full px-6 pt-14 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setIsModalOpen(true)}
            >
              New Chat
            </button>
            
            <div className="flex-1">
              <div className="text-sm text-gray-500 text-center mt-4">
                No chats yet
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="btn btn-circle btn-sm btn-ghost absolute left-4 top-2"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            className="w-5 h-5 stroke-current stroke-2"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <button 
          onClick={() => setIsModalOpen(true)}
          className={`btn btn-circle btn-sm btn-primary absolute left-4 top-14 transition-all duration-300 ${isSidebarOpen ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Right section */}
      <div className={`flex-1 bg-base-100 transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-16'} -ml-60 flex flex-col shadow-lg`}>
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select or create a chat to get started
        </div>
      </div>
      <CreateChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateChat}
      />
    </div>
  );
};

export default Chat;

  