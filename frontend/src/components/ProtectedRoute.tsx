import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { loading, user } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (loading) {
          return <div className="page">Loading...</div>;
        }

        return user ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        );
      }}
    />
  );
};

export default ProtectedRoute;
