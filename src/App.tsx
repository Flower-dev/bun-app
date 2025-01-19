import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthForms from './components/authForms';
import Dashboard from './components/dashboard';
import { AuthProvider } from './context/authContext';
import { ProtectedRoute } from './routes/protectedRoutes';
import "./index.css"

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      
        <Routes>
      
          <Route path="/auth" element={<AuthForms />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/auth" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;