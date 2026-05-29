import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // List of routes that should use full-width layout without sidebar
  const fullWidthRoutes = ['/', '/login', '/register', '/forgot-password'];
  const isFullWidthRoute = fullWidthRoutes.includes(location.pathname);

  if (isFullWidthRoute) {
    return <>{children}</>;
  }

  return (
    <div className="app-bg min-h-screen">
      <Navbar />
      <Sidebar />
      <div className="md:ml-80">
        <main className="min-h-screen pb-24 pt-6 px-4 sm:px-6 md:px-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
