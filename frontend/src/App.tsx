import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
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
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <Sidebar />
          <div className="md:ml-80">
            <main className="min-h-screen pb-24 pt-6 px-4 sm:px-6 md:px-8 lg:px-10">
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
                <Route
                  render={() => (
                    <div className="rounded-[32px] bg-white p-8 shadow-soft">
                      <h1 className="text-2xl font-semibold">Page not found</h1>
                      <p className="mt-2 text-slate-600">The page you are looking for does not exist.</p>
                    </div>
                  )}
                />
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
