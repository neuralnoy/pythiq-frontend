// components/nav/NavBrand.jsx
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';

const NavBrand = () => (
  <div className="flex-1">
    <Link to="/" className="flex items-center gap-2">
      <Logo />
      <span className="text-xl font-bold text-primary tracking-tight">PythiQ</span>
    </Link>
  </div>
);

export default NavBrand;