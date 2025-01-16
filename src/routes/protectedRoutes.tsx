import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';


export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};
