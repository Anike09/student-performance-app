import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardPage from './pages/DashboardPage';
import GpaAnalysis from './pages/GpaAnalysis';
import Recommendations from './pages/Recommendations';
import AcademicRecordEntry from './pages/AcademicRecordEntry';
import StudentList from './pages/StudentList';
import StudentProfile from './pages/StudentProfile';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <main className="app-shell">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/dashboard">
              <DashboardPage />
            </PrivateRoute>
            <PrivateRoute path="/gpa-analysis">
              <GpaAnalysis />
            </PrivateRoute>
            <PrivateRoute path="/recommendations">
              <Recommendations />
            </PrivateRoute>
            <PrivateRoute path="/academic-record">
              <AcademicRecordEntry />
            </PrivateRoute>
            <PrivateRoute path="/students" exact>
              <StudentList />
            </PrivateRoute>
            <PrivateRoute path="/students/:studentId">
              <StudentProfile />
            </PrivateRoute>
            <Route render={() => <div className="page"><h1>Page not found</h1></div>} />
          </Switch>
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;