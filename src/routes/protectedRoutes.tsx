import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};