import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { getConnection } from '../../store/slices/connectionSlice';
import React, { ReactNode } from 'react';

interface IAuthRoute {
  redirectPath: string;
  component: ReactNode;
}
export const AuthRoute: React.FC<IAuthRoute> = ({ redirectPath, component }) => {
  const isAuthenticated = useAppSelector(getConnection).isAuthenticated;
  if (isAuthenticated) return <Navigate to={redirectPath} />;
  return <>{component}</>;
};
