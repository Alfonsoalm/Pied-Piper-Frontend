import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from './Header';
import useAuth from '../../../hooks/useAuth';

export const PublicLayout = () => {
  const { auth } = useAuth();

  console.log("auth._id:",auth._id);

  return (
    <div className="public-layout">
      <Header className="public-layout__header" />
      <section className="public-layout__content">
        {!auth._id ? <Outlet /> : <Navigate to="/social" />}
      </section>
    </div>
  );
};
