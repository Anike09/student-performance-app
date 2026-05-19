import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
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
        <NavLink to="/login" activeClassName="active">
          Login
        </NavLink>
        <NavLink to="/register" activeClassName="active">
          Register
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
