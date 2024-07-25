"use client";
import React from 'react';
import Home from '../Index/page';
import AdminHome from '../AdminHome/page';
import { useAuth } from '../contexts/AuthContext';

const RoleBased: React.FC = () => {
  const { user } = useAuth();

  const renderHome = () => {
    if (user?.is_admin) {
      return <AdminHome />;
    } else if (user?.is_owner) {
      return (
        <div>
          <h2 className="text-3xl font-bold">Owner Home</h2>
          <p className="text-lg">Owner side pages are under construction.</p>
        </div>
      );
    } else {
      return <Home />;
    }
  };

  return (
    <main>
      <div>
        {renderHome()}
      </div>
    </main>
  );
};

export default RoleBased;
