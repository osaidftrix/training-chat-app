import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { getConnection } from '../../store/slices/connectionSlice';
import Layout from '../Layout/layout';
import React, { ReactNode } from 'react';

interface IPrivateRoute {
    redirectPath: string;
    component: ReactNode; 
}
export const PrivateRoute: React.FC<IPrivateRoute> = ({ redirectPath, component }) => {
  const isAuthenticated = useAppSelector(getConnection).isAuthenticated;
  if (!isAuthenticated) return <Navigate to={redirectPath} />;
  return <Layout>{component}</Layout>;
};
