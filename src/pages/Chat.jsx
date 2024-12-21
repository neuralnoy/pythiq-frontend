import { useState, useEffect } from 'react';
import { PlusIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import CreateChatModal from '../components/chat/CreateChatModal';
import { Link } from 'react-router-dom';
import { chatService } from '../services/chatService';
import { toast } from 'react-hot-toast';
import DeleteChatModal from '../components/chat/DeleteChatModal';

const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const fetchedChats = await chatService.getChats();
      setChats(fetchedChats);
    } catch (error) {
      console.error('Failed to load chats:', error);
      toast.error('Failed to load chats');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateChat = async (chatData) => {
    try {
      const newChat = await chatService.createChat(chatData);
      setChats(prevChats => [newChat, ...prevChats]);
      setIsModalOpen(false);
      toast.success('Chat created successfully');
    } catch (error) {
      console.error('Failed to create chat:', error);
      toast.error(error.message || 'Failed to create chat');
    }
  };

  const handleDeleteChat = async () => {
    try {
      await chatService.deleteChat(selectedChat.id);
      setChats(prevChats => prevChats.filter(chat => chat.id !== selectedChat.id));
      setSelectedChat(null);
      toast.success('Chat deleted successfully');
    } catch (error) {
      console.error('Failed to delete chat:', error);
      toast.error('Failed to delete chat');
    }
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
                {isLoading ? (
                  <div className="text-sm text-gray-500 text-center">
                    Loading chats...
                  </div>
                ) : chats.length === 0 ? (
                  <div className="text-sm text-gray-500 text-center">
                    No chats yet
                  </div>
                ) : (
                  chats.map((chat) => (
                    <div 
                      key={chat.id} 
                      className="mt-2 p-2 border rounded hover:bg-base-200 cursor-pointer group"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{chat.title}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(chat.last_modified).toLocaleDateString()}
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedChat(chat);
                          }}
                          className="btn btn-ghost btn-xs text-error opacity-0 group-hover:opacity-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
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
                  className="w-5 h-5 text-primary"
                >
                  <path 
                    d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" 
                  />
                </svg>
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2 text-center">
              PythiQ can make mistakes. <Link to="/terms" className="link link-primary">Check Terms and Policies</Link>.
            </p>
          </div>
        </div>
      </div>

      <CreateChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateChat}
      />

      <DeleteChatModal
        isOpen={!!selectedChat}
        onClose={() => setSelectedChat(null)}
        onConfirm={handleDeleteChat}
        chatTitle={selectedChat?.title}
      />
    </div>
  );
};

export default Chat;