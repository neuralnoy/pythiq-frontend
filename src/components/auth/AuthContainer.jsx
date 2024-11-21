import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import SocialLoginButtons from './SocialLoginButtons';
import AuthForm from './AuthForm';
import AuthToggle from './AuthToggle';

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (e, { rememberMe }) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password, rememberMe);
    } else {
      await register(email, password);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="card w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Welcome to PythiQ</h2>
          <SocialLoginButtons />
          <div className="divider">OR</div>
          <AuthForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleSubmit}
            isLogin={isLogin}
          />
          <AuthToggle 
            isLogin={isLogin} 
            onToggle={() => setIsLogin(!isLogin)} 
          />
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;