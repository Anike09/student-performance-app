import React from 'react';

interface AtRiskSubject {
    subject: string;
    averageGrade: number;
    threshold: number;
}

interface AtRiskListProps {
    atRiskSubjects: AtRiskSubject[];
}

const AtRiskList: React.FC<AtRiskListProps> = ({ atRiskSubjects }) => {
    return (
        <div>
            <h2>At-Risk Subjects</h2>
            <ul>
                {atRiskSubjects.map((subject, index) => (
                    <li key={index}>
                        {subject.subject} - Average Grade: {subject.averageGrade} (Threshold: {subject.threshold})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AtRiskList;