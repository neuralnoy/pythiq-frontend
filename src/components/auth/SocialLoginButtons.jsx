// components/auth/SocialLoginButtons.jsx
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

const SocialLoginButtons = () => (
  <div className="flex flex-col gap-3">
    <button className="btn btn-outline gap-2">
      <FcGoogle className="w-5 h-5" />
      Continue with Google
    </button>
    <button className="btn btn-outline gap-2">
      <FaApple className="w-5 h-5" />
      Continue with Apple
    </button>
  </div>
);

export default SocialLoginButtons;