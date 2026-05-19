import React from 'react';
import GradeChart from './GradeChart';
import AtRiskList from './AtRiskList';

const Dashboard: React.FC = () => {
    const sampleGrades = [68, 72, 78, 82, 85, 88];
    const sampleLabels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'];
    const atRiskSubjects = [
        { subject: 'Mathematics', averageGrade: 48, threshold: 50 },
        { subject: 'Physics', averageGrade: 52, threshold: 55 },
    ];

    return (
        <div className="dashboard-page">
            <h1>Student Performance Dashboard</h1>
            <div className="dashboard-widgets">
                <GradeChart grades={sampleGrades} labels={sampleLabels} />
                <AtRiskList atRiskSubjects={atRiskSubjects} />
            </div>
        </div>
    );
};

export default Dashboard;