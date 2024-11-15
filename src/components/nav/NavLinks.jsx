// components/nav/NavLinks.jsx
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  ServerStackIcon, 
  ChatBubbleLeftRightIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

const NavLinks = ({ user }) => {
  if (!user) return null;

  return (
    <div className="flex-1 flex justify-center">
      <div className="flex flex-col sm:flex-row gap-2">
        <Link to="/knowledge" className="btn btn-primary btn-sm font-bold">
          <ServerStackIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Knowledge Base</span>
        </Link>
        <Link to="/chat" className="btn btn-primary btn-sm font-bold">
          <ChatBubbleLeftRightIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Chat</span>
        </Link>
        <Link to="/search" className="btn btn-primary btn-sm font-bold">
          <MagnifyingGlassIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Search</span>
        </Link>
      </div>
    </div>
  );
};

NavLinks.propTypes = {
  user: PropTypes.object
};

export default NavLinks;