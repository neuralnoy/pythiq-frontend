import { useAuth } from '../context/AuthContext';
import NavBrand from './nav/NavBrand';
import NavLinks from './nav/NavLinks';
import UserMenu from './nav/UserMenu';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-lg px-4">
      <NavBrand />
      <NavLinks user={user} />
      <div className="flex-1 flex justify-end">
        <UserMenu user={user} logout={logout} />
      </div>
    </div>
  );
};

export default Navbar;