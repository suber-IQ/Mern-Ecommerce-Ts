import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state: RootState) => state.user);
  if(loading) return null;

  if (isAuthenticated === false) {
    return <Navigate to="/login" replace={true} />;
  }

  return <>{children}</>;
};

export default Protected;
