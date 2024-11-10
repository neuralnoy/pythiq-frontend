// Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ServerStackIcon, 
  ChatBubbleLeftRightIcon, 
  MagnifyingGlassIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-lg px-4">
      {/* Brand/Logo */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2">
          <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 5C11.716 5 5 11.716 5 20C5 28.284 11.716 35 20 35C28.284 35 35 28.284 35 20C35 11.716 28.284 5 20 5ZM20 10C25.523 10 30 14.477 30 20C30 25.523 25.523 30 20 30C14.477 30 10 25.523 10 20C10 14.477 14.477 10 20 10ZM20 15C17.239 15 15 17.239 15 20C15 22.761 17.239 25 20 25C22.761 25 25 22.761 25 20C25 17.239 22.761 15 20 15ZM28 28L33 33"
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xl font-bold text-primary tracking-tight">PythiQ</span>
        </Link>
      </div>

      {/* Navigation Links */}
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

      {/* User Profile/Auth */}
      <div className="flex-1 flex justify-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <UserCircleIcon className="w-8 h-8" />
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li className="menu-title px-4 py-2">
                <span className="text-sm font-semibold">{user.email}</span>
              </li>
              <li>
                <button 
                  onClick={logout} 
                  className="text-error"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;