// components/nav/NavBrand.jsx
import { Link } from 'react-router-dom';

const NavBrand = () => (
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
);

export default NavBrand;