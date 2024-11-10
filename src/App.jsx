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

                {/* Right side - Company Info */}
                <div 
                  className="hidden lg:block relative bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')"
                  }}
                >
                  <div className="absolute inset-0 bg-primary/30 backdrop-blur-sm">
                    <div className="p-12 h-full flex flex-col justify-center">
                      <div className="card">
                        <div className="card-body">
                          <h1 className="text-4xl font-bold text-white">Tailored AI Solutions</h1>
                          <p className="mt-4 text-white/90">
                            Welcome to our platform. We provide innovative solutions
                            for your business needs. Join us to experience the next
                            generation of technology.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/knowledge" replace />
            )
          } 
        />
        
        {/* Protected Routes */}
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

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;