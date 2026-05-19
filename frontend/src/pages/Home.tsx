import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="page home-page">
            <h1>Welcome to the Student Performance Dashboard</h1>
            <p>
                Track your GPA, manage academic records, and get personalized recommendations for student success.
            </p>
            <div className="button-group">
                <Link className="button" to="/dashboard">
                    View Dashboard
                </Link>
                <Link className="button secondary" to="/login">
                    Login
                </Link>
                <Link className="button secondary" to="/register">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Home;
