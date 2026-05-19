import React, { useState } from 'react';

const Recommendations: React.FC = () => {
    const [focusArea, setFocusArea] = useState('Study habits');
    const [recommendations] = useState([
        {
            title: 'Focus on high-impact courses',
            description: 'Review 3+ unit classes first and make weekly study goals for those subjects.',
        },
        {
            title: 'Regular practice sessions',
            description: 'Spend at least one hour every day solving example problems for your most challenging subjects.',
        },
        {
            title: 'Meet with your instructor',
            description: 'Discuss target grades for upcoming assessments and request clarification on difficult topics.',
        },
    ]);

    return (
        <div className="page recommendations-page">
            <h1>Recommendations</h1>
            <p>Here are personalized suggestions to improve academic performance.</p>
            <div className="form-group">
                <label>Focus area</label>
                <select value={focusArea} onChange={(event) => setFocusArea(event.target.value)}>
                    <option>Study habits</option>
                    <option>Time management</option>
                    <option>Exam preparation</option>
                </select>
            </div>
            <div className="recommendations-list">
                {recommendations.map((item, index) => (
                    <div key={index} className="page-section">
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
