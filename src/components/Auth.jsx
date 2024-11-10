// src/components/Auth.jsx
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaGithub } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await register(email, password);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="card w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Welcome to PythiQ</h2>
          
          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3">
            <button className="btn btn-outline gap-2">
              <FcGoogle className="w-5 h-5" />
              Continue with Google
            </button>
            <button className="btn btn-outline gap-2">
              <FaApple className="w-5 h-5" />
              Continue with Apple
            </button>
            <button className="btn btn-outline gap-2">
              <FaGithub className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>

          <div className="divider">OR</div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              className="btn btn-link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}