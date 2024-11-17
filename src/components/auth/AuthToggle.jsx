import PropTypes from 'prop-types';

const AuthToggle = ({ isLogin, onToggle }) => (
  <button 
    type="button"
    className="btn btn-link mt-4"
    onClick={onToggle}
  >
    {isLogin 
      ? "Don't have an account? Sign Up" 
      : "Already have an account? Sign In"
    }
  </button>
);

AuthToggle.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default AuthToggle;