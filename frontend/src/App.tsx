import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <main className="app-shell">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/gpa-analysis" component={GpaAnalysis} />
          <Route path="/recommendations" component={Recommendations} />
          <Route path="/academic-record" component={AcademicRecordEntry} />
          <Route path="/students" exact component={StudentList} />
          <Route path="/students/:studentId" component={StudentProfile} />
          <Route render={() => <div className="page"><h1>Page not found</h1></div>} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;