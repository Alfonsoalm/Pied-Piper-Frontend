import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from './PublicHeader';
import useAuth from '../../hooks/useAuth';

export const PublicLayout = () => {
  const { auth } = useAuth();

  return (
    <div className="public-layout">
      <Header className="public-layout__header" />
      <section className="public-layout__content">
        {!auth._id ? <Outlet /> : <Navigate to="/social" />}
      </section>
    </div>
  );
};
