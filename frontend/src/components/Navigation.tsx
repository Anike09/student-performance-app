import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="site-nav">
      <div className="brand">Performance Dashboard</div>
      <div>
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/dashboard" activeClassName="active">
          Dashboard
        </NavLink>
        <NavLink to="/gpa-analysis" activeClassName="active">
          GPA Analysis
        </NavLink>
        <NavLink to="/recommendations" activeClassName="active">
          Recommendations
        </NavLink>
        <NavLink to="/academic-record" activeClassName="active">
          Add Record
        </NavLink>
      </div>
      <div>
        {user ? (
          <>
            <span className="nav-user">{user.name}</span>
            <button className="link-button secondary" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
            <NavLink to="/register" activeClassName="active">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
