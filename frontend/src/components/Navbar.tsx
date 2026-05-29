import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/30 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-semibold text-slate-900">Student Dashboard</Link>

        <nav className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login" className="btn bg-white text-slate-900 px-4 py-2">Login</Link>
              <Link to="/register" className="btn">Register</Link>
            </>
          ) : (
            <>
              <span className="text-sm text-slate-800">Hi, {user.username}</span>
              <button onClick={logout} className="btn bg-white text-slate-900 px-4 py-2">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
