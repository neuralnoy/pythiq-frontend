// src/routes/index.jsx
import LandingPage from '../pages/LandingPage';
import ProfileSettings from '../pages/ProfileSettings';
import KnowledgeBase from '../pages/KnowledgeBase';
import Chat from '../pages/Chat';
import Search from '../pages/Search';
import KnowledgeBaseDetails from '../pages/KnowledgeBaseDetails';

export const routes = [
  {
    path: '/',
    element: <LandingPage />,
    protected: false
  },
  {
    path: '/profile',
    element: <ProfileSettings />,
    protected: true
  },
  {
    path: '/knowledge',
    element: <KnowledgeBase />,
    protected: true
  },
  {
    path: '/chat',
    element: <Chat />,
    protected: true
  },
  {
    path: '/search',
    element: <Search />,
    protected: true
  },
  {
    path: '/knowledge/:id',
    element: <KnowledgeBaseDetails />,
    protected: true
  },
];