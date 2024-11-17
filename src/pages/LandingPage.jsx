import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthContainer from '../components/auth/AuthContainer';
import NavBrand from '../components/nav/NavBrand';

const LandingPage = () => {
  const { user } = useAuth();
  
  if (user) return <Navigate to="/knowledge" replace />;
  
  return (
    <div className="drawer drawer-end">
      <input id="auth-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* Page content */}
      <div className="drawer-content">
        <div className="min-h-screen flex flex-col">
          {/* Navigation Bar */}
          <div className="flex justify-between items-center p-4">
            <NavBrand />
            <label htmlFor="auth-drawer" className="btn btn-primary drawer-button">
              Sign In
            </label>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-4 text-center">CHAT WITH YOUR DOCS AND MORE</h1>
            <div className="w-full max-w-lg rounded-lg overflow-hidden shadow-xl bg-black/20 mb-6">
              <video 
                className="w-full h-auto"
                autoPlay 
                muted 
                loop 
                playsInline
                controls
              >
                <source src="/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-lg text-center max-w-2xl">
              Experience the power of AI-driven solutions tailored to your needs.
              Our platform provides intelligent automation and insights to transform your workflow.
            </p>
          </div>
        </div>
      </div>

      {/* Drawer side */}
      <div className="drawer-side">
        <label htmlFor="auth-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="p-4 w-80 min-h-full bg-base-200">
          <AuthContainer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;