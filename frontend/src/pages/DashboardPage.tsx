import React from 'react';
import Dashboard from '../components/Dashboard';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
    return (
        <div className="page dashboard-page">
            <div className="page-intro">
                <h1>Dashboard</h1>
                <p>Monitor your academic progress, GPA trends, and at-risk subjects in one place.</p>
            </div>
            <div className="button-group">
                <Link className="button" to="/gpa-analysis">
                    GPA Analysis
                </Link>
                <Link className="button secondary" to="/recommendations">
                    Recommendations
                </Link>
                <Link className="button secondary" to="/academic-record">
                    Add Academic Record
                </Link>
            </div>
            <Dashboard />
        </div>
    );
};

export default DashboardPage;
