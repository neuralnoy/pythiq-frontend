// src/pages/Chat.jsx
import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import CreateChatModal from '../components/chat/CreateChatModal';

const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateChat = async (chatData) => {
    // TODO: Implement chat creation logic
    console.log('Creating chat:', chatData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className={`relative transition-all duration-300 ${isSidebarOpen ? 'w-60' : 'w-16'} bg-base-200`}>
          <div className={`absolute top-0 transition-all duration-300 ${isSidebarOpen ? 'left-0' : '-left-64'} w-60 min-h-[calc(100vh-4rem)] bg-base-200 z-40`}>
            {/* Sidebar content */}
            <div className={`flex flex-col h-full px-6 pt-12 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => setIsModalOpen(true)}
              >
                New Chat
              </button>
              
              {/* Chat list */}
              <div className="flex-1">
                <div className="text-sm text-gray-500 text-center mt-4">
                  No chats yet
                </div>
              </div>
            </div>
          </div>

          {/* Toggle button - always visible */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="btn btn-circle btn-sm btn-ghost absolute left-4 top-2 z-50 bg-base-200"
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

          {/* Plus button - visible when sidebar is collapsed */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className={`btn btn-circle btn-sm btn-primary absolute left-4 top-14 z-50 transition-all duration-300 ${isSidebarOpen ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Main chat area */}
          <div className="p-4">
            <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center text-gray-500">
              Select or create a chat to get started
            </div>
          </div>
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

  