import React from 'react';
import { GradeChart } from './GradeChart';
import { AtRiskList } from './AtRiskList';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <h1>Student Performance Dashboard</h1>
            <GradeChart />
            <AtRiskList />
        </div>
    );
};

export default Dashboard;