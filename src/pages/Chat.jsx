import { useState, useEffect, useRef } from 'react';
import { PlusIcon, GlobeAltIcon, TrashIcon, RectangleStackIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import CreateChatModal from '../components/chat/CreateChatModal';
import DeleteChatModal from '../components/chat/DeleteChatModal';
import ChatLibrariesModal from '../components/chat/ChatLibrariesModal';
import { Link } from 'react-router-dom';
import { chatService } from '../services/chatService';
import { toast } from 'react-hot-toast';

const TypewriterMessage = ({ content, isNewMessage }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(isNewMessage);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isNewMessage) {
      setDisplayedContent(content);
      return;
    }

    let index = 0;
    setIsTyping(true);
    setDisplayedContent('');

    const interval = setInterval(() => {
      if (index < content.length) {
        setDisplayedContent((prev) => prev + content[index]);
        index++;
        scrollToBottom();
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 2);

    return () => clearInterval(interval);
  }, [content, isNewMessage]);

  return (
    <div className="prose max-w-none">
      {isTyping ? (
        <div className="whitespace-pre-wrap">
          {displayedContent}
          <span className="animate-pulse">▋</span>
          <div ref={messageEndRef} />
        </div>
      ) : (
        <>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-4 mb-2" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-base font-bold mt-3 mb-2" {...props} />,
              p: ({node, ...props}) => <p className="mb-2" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2" {...props} />,
              li: ({node, ...props}) => <li className="mb-1" {...props} />,
              code: ({node, inline, className, ...props}) => {
                const match = /language-(\w+)/.exec(className || '');
                const lang = match && match[1];
                
                if (lang === 'math') {
                  return <div className="my-2 overflow-x-auto">{props.children}</div>;
                }
                
                return inline ? (
                  <code className="bg-base-300 px-1 rounded" {...props} />
                ) : (
                  <code className="block bg-base-300 p-2 rounded" {...props} />
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
          <div ref={messageEndRef} />
        </>
      )}
    </div>
  );
};

const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatToDelete, setChatToDelete] = useState(null);
  const [lastMessageId, setLastMessageId] = useState(null);
  const [showLibrariesModal, setShowLibrariesModal] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const fetchedChats = await chatService.getChats();
      console.log('Fetched chats with dates:', fetchedChats.map(chat => ({
        title: chat.title,
        last_modified: chat.last_modified
      })));
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
      handleSelectChat(newChat);
      toast.success('Chat created successfully');
    } catch (error) {
      console.error('Failed to create chat:', error);
      toast.error(error.message || 'Failed to create chat');
    }
  };

  const handleDeleteChat = async () => {
    try {
      await chatService.deleteChat(chatToDelete.id);
      setChats(prevChats => prevChats.filter(chat => chat.id !== chatToDelete.id));
      if (selectedChat?.id === chatToDelete.id) {
        setSelectedChat(null);
        setMessages([]);
      }
      setChatToDelete(null);
      toast.success('Chat deleted successfully');
    } catch (error) {
      console.error('Failed to delete chat:', error);
      toast.error('Failed to delete chat');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !selectedChat || isSending) return;

    try {
      setIsSending(true);
      const response = await chatService.sendMessage(selectedChat.id, inputMessage.trim());
      
      setLastMessageId(response.assistant_message.id);
      setMessages(prev => [...prev, response.user_message, response.assistant_message]);
      setInputMessage('');
      
      // Reload chats to get updated last_modified timestamp
      loadChats();
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const handleSelectChat = async (chat) => {
    setSelectedChat(chat);
    setLastMessageId(null);
    try {
      const chatMessages = await chatService.getChatMessages(chat.id);
      setMessages(chatMessages);
    } catch (error) {
      if (error.message === 'Failed to fetch messages') {
        setMessages([]);
      } else {
        console.error('Failed to load messages:', error);
        toast.error('Failed to load messages');
      }
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
                      className={`mt-2 p-2 border rounded hover:bg-base-200 cursor-pointer group ${
                        selectedChat?.id === chat.id ? 'bg-base-200' : ''
                      }`}
                      onClick={() => handleSelectChat(chat)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{chat.title}</div>
                          <div className="text-xs text-gray-500">
                            {chat.last_modified ? (
                              (() => {
                                try {
                                  return new Date(chat.last_modified).toLocaleString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  });
                                } catch (e) {
                                  console.error('Error parsing date:', chat.last_modified, e);
                                  return 'Invalid date';
                                }
                              })()
                            ) : 'No date available'}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowLibrariesModal(true);
                              setSelectedChat(chat);
                            }}
                            className="btn btn-ghost btn-xs opacity-0 group-hover:opacity-100"
                            title="View Bookshelves"
                          >
                            <RectangleStackIcon className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setChatToDelete(chat);
                            }}
                            className="btn btn-ghost btn-xs opacity-0 group-hover:opacity-100"
                            title="Delete Chat"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
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
        <div className="flex-1 container mx-auto px-4 py-8 overflow-y-auto">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`chat ${message.role === 'user' ? 'chat-end' : 'chat-start'} mb-4`}
            >
              <div className={`chat-bubble ${message.role === 'user' ? 'chat-bubble-primary' : ''}`}>
                {message.role === 'user' ? (
                  message.content
                ) : (
                  <TypewriterMessage 
                    content={message.content} 
                    isNewMessage={message.id === lastMessageId}
                  />
                )}
              </div>
            </div>
          ))}
          {isSending && (
            <div className="chat chat-start mb-4">
              <div className="chat-bubble">
                <span className="loading loading-dots loading-sm"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat Input Bar */}
        <div className="bg-base-100 p-4 mb-16">
          <div className="container mx-auto max-w-4xl">
            <form className="relative" onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="input input-bordered w-full pr-12"
                disabled={!selectedChat || isSending}
              />
              <button 
                type="submit" 
                className={`absolute right-3 top-1/2 translate-y-[-50%] p-2 rounded-full transition-all duration-200
                  ${isSending ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-105'}`}
                disabled={!selectedChat || isSending}
              >
                {isSending ? (
                  <div className="loading loading-spinner loading-xs"></div>
                ) : (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-5 h-5 text-primary"
                  >
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                )}
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2 text-center">
              PythiQ can make mistakes, including about people and facts, so double-check it. <Link to="/terms" className="link link-primary">Your Terms and Policies</Link>.
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
        isOpen={!!chatToDelete}
        onClose={() => setChatToDelete(null)}
        onConfirm={handleDeleteChat}
        chatTitle={chatToDelete?.title}
      />

      <ChatLibrariesModal
        isOpen={showLibrariesModal}
        onClose={() => setShowLibrariesModal(false)}
        knowledgeBaseIds={selectedChat?.knowledge_base_ids || []}
      />
    </div>
  );
};

export default Chat;