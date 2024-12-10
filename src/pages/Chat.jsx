import { useState } from 'react';
import { PlusIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import CreateChatModal from '../components/chat/CreateChatModal';

const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateChat = async (chatData) => {
    // TODO: Implement chat creation logic
    console.log('Creating chat:', chatData);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-60' : 'w-16'} border-r border-base-200 flex flex-col h-full bg-base-200/50`}>
        <div className={`relative flex-1`}>
          <div className={`absolute inset-y-0 transition-all duration-300 ${isSidebarOpen ? 'left-0' : '-left-64'} w-60`}>
            <div className={`flex flex-col h-full pl-3 pr-0.5 pt-14 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              <button 
                className="btn btn-primary btn-sm rounded-full w-28 gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                <PlusIcon className="w-4 h-4" />
                New Chat
              </button>
              
              <div className="flex-1 overflow-y-auto mt-4 pr-0.5 mb-16">
                <div className="text-sm text-gray-500 text-center">
                  No chats yet
                </div>
                {/* Test content for scrolling */}
                {[...Array(40)].map((_, i) => (
                  <div key={i} className="mt-2 p-2 border rounded">
                    Chat {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Button - Expanded Sidebar */}
            <div className="absolute bottom-4 w-full px-3">
              <button 
                className="btn btn-ghost gap-2 w-full"
                onClick={() => console.log('FAQ clicked')}
              >
                <GlobeAltIcon className="w-5 h-5" />
                FAQ
              </button>
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

          {/* FAQ Button - Collapsed Sidebar */}
          <button 
            onClick={() => console.log('FAQ clicked')}
            className={`btn btn-circle btn-sm btn-ghost absolute left-4 bottom-4 transition-all duration-300 ${isSidebarOpen ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
          >
            <GlobeAltIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 container mx-auto px-4 py-8">
          {/* Chat messages will go here */}
        </div>
        
        {/* Chat Input Bar */}
        <div className="bg-base-100 p-4 mb-16">
          <div className="container mx-auto max-w-4xl">
            <form className="relative" onSubmit={(e) => {
              e.preventDefault();
              // TODO: Handle message submission
            }}>
              <input
                type="text"
                placeholder="Type your message..."
                className="input input-bordered w-full pr-12"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 translate-y-[-50%] p-2 rounded-full hover:scale-110 active:scale-105 transition-transform duration-200"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-5 h-5"
                >
                  <path 
                    d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" 
                  />
                </svg>
              </button>
            </form>
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