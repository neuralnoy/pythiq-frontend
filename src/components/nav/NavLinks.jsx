// components/nav/NavLinks.jsx
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  BookOpenIcon, 
  ChatBubbleLeftRightIcon, 
  ChartBarIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

const NavLinks = ({ user }) => {
  if (!user) return null;

  return (
    <div className="flex-1 flex justify-center">
      <div className="flex flex-col sm:flex-row gap-2">
        <Link to="/knowledge" className="btn btn-primary font-bold w-32">
          <BookOpenIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Library</span>
        </Link>
        <Link to="/chat" className="btn btn-primary font-bold w-32">
          <ChatBubbleLeftRightIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Chat</span>
        </Link>
        <Link to="/usage" className="btn btn-primary font-bold w-32">
          <ChartBarIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Usage</span>
        </Link>
      </div>
    </div>
  );
};

NavLinks.propTypes = {
  user: PropTypes.object
};

export default NavLinks;