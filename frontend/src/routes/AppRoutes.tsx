import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import DashboardPage from '../pages/DashboardPage';
import GpaAnalysis from '../pages/GpaAnalysis';
import GpaCalculator from '../pages/GpaCalculator';
import Recommendations from '../pages/Recommendations';
import AcademicRecordEntry from '../pages/AcademicRecordEntry';
import StudentList from '../pages/StudentList';
import StudentProfile from '../pages/StudentProfile';
import ProtectedRoute from '../components/ProtectedRoute';
import MainLayout from '../layouts/MainLayout';

const AppRoutes: React.FC = () => {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={ForgotPassword} />

        <ProtectedRoute path="/dashboard">
          <DashboardPage />
        </ProtectedRoute>

        <ProtectedRoute path="/gpa-analysis">
          <GpaAnalysis />
        </ProtectedRoute>

        <ProtectedRoute path="/gpa-calculator">
          <GpaCalculator />
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
    </MainLayout>
  );
};

export default AppRoutes;
