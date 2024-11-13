import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '@/api/fetchData';

interface AuthGuardProps {
  children: React.ReactNode;
}

export interface TokenData {
    valid: boolean;
  }

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        // No token; redirect to login
        setIsAuthenticated(false);
        navigate('/login');
        return;
      }

      try {
        // Send the token to the backend for validation
        const response = await fetchData<TokenData>('verify-token',{ token } );

        if (response.valid) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          sessionStorage.removeItem('authToken');
          navigate('/');
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        setIsAuthenticated(false);
        sessionStorage.removeItem('authToken');
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  // While checking, dont render
  if (isAuthenticated === null) return null;

  // Render children if authenticated; otherwise, user is redirected
  return <>{isAuthenticated ? children : null}</>;
};

export default AuthGuard;
