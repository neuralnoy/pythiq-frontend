// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { routes } from './routes/index';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {user && <Navbar />}
      <Routes>
        {routes.map(({ path, element, protected: isProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              isProtected ? (
                <ProtectedRoute>{element}</ProtectedRoute>
              ) : (
                element
              )
            }
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;