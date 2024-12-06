import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserAvatar = ({ user }) => (
  <div className="bg-primary text-primary-content rounded-full w-8">
    <span className="text-sm">{user?.email?.[0]?.toUpperCase() || 'U'}</span>
  </div>
);

UserAvatar.propTypes = {
  user: PropTypes.object
};

const UserMenu = ({ user, logout }) => {
  if (!user) {
    return <Link to="/login" className="btn btn-primary btn-sm">Login</Link>;
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
        <UserAvatar user={user} />
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li className="menu-title px-4 py-2">
          <span className="text-sm font-semibold">{user.email}</span>
        </li>
        <li><Link to="/profile">Profile Settings</Link></li>
        <li><button onClick={logout}>Logout</button></li>
      </ul>
    </div>
  );
};

UserMenu.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired
};

export default UserMenu;