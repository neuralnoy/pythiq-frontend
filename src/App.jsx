// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Auth from './components/Auth';
import Navbar from './components/Navbar';

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {user && <Navbar />}
      <Routes>
        <Route 
          path="/" 
          element={
            !user ? (
              <div className="grid lg:grid-cols-2 min-h-screen">
                {/* Left side - Login */}
                <div className="p-8 flex items-center justify-center">
                  <div className="card w-full max-w-md">
                    <div className="card-body">
                      <Auth />
                    </div>
                  </div>
                </div>

                {/* Right side - Company Info with Video */}
                <div 
                  className="hidden lg:block relative bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')"
                  }}
                >
                  <div className="absolute inset-0 bg-primary/30 backdrop-blur-sm">
                    <div className="flex flex-col items-center justify-center h-full p-8 text-white">
                      <h1 className="text-4xl font-bold mb-4">Tailored AI Solutions</h1>
                      <div className="w-full max-w-lg rounded-lg overflow-hidden shadow-xl bg-black/20">
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
                      <p className="mt-6 text-lg text-center max-w-2xl">
                        Experience the power of AI-driven solutions tailored to your needs.
                        Our platform provides intelligent automation and insights to transform your workflow.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/knowledge" replace />
            )
          }
        />
        <Route 
          path="/knowledge" 
          element={user ? <div>Knowledge Base</div> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/chat" 
          element={user ? <div>Chat</div> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/search" 
          element={user ? <div>Search</div> : <Navigate to="/" replace />} 
        />
      </Routes>
    </div>
  );
}

export default App;