import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StudentList from './pages/StudentList';
import StudentProfile from './pages/StudentProfile';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/students" component={StudentList} />
        <Route path="/students/:id" component={StudentProfile} />
      </Switch>
    </Router>
  );
};

export default App;