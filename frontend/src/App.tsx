import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardPage from './pages/DashboardPage';
import GpaAnalysis from './pages/GpaAnalysis';
import Recommendations from './pages/Recommendations';
import AcademicRecordEntry from './pages/AcademicRecordEntry';
import StudentList from './pages/StudentList';
import StudentProfile from './pages/StudentProfile';
import { AuthProvider } from './context/AuthContext';

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
            <ProtectedRoute path="/dashboard">
              <DashboardPage />
            </ProtectedRoute>
            <ProtectedRoute path="/gpa-analysis">
              <GpaAnalysis />
            </ProtectedRoute>
            <ProtectedRoute path="/recommendations">
              <Recommendations />
            </ProtectedRoute>
            <ProtectedRoute path="/academic-record">
              <AcademicRecordEntry />
            </ProtectedRoute>
            <ProtectedRoute path="/students" exact>
              <StudentList />
            </ProtectedRoute>
            <ProtectedRoute path="/students/:studentId">
              <StudentProfile />
            </ProtectedRoute>
            <Route render={() => <div className="page"><h1>Page not found</h1></div>} />
          </Switch>
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;
