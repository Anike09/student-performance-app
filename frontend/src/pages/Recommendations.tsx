import React, { useEffect, useState } from 'react';
import { getStudents, getRecommendations } from '../services/api';
import { Student } from '../types';

const Recommendations: React.FC = () => {
    const [focusArea, setFocusArea] = useState('Study habits');
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudentId, setSelectedStudentId] = useState<string>('');
    const [recommendations, setRecommendations] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStudents = async () => {
            try {
                const data = await getStudents();
                setStudents(data);
                if (data.length) setSelectedStudentId(String(data[0].id));
            } catch (err) {
                setError('Could not load students for recommendations.');
            }
        };
        loadStudents();
    }, []);

    useEffect(() => {
        const loadRecommendations = async () => {
            if (!selectedStudentId) return;
            try {
                const data = await getRecommendations(selectedStudentId);
                setRecommendations(data.recommendations || []);
            } catch (err) {
                setError('Unable to fetch recommendations.');
            }
        };
        loadRecommendations();
    }, [selectedStudentId]);

    return (
        <div className="page recommendations-page">
            <h1>Recommendations</h1>
            <p>Review tailored suggestions based on the selected student record.</p>
            <div className="form-group">
                <label htmlFor="studentSelect">Student</label>
                <select
                    id="studentSelect"
                    value={selectedStudentId}
                    onChange={(event) => setSelectedStudentId(event.target.value)}
                >
                    <option value="">Choose a student</option>
                    {students.map((student) => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Focus area</label>
                <select value={focusArea} onChange={(event) => setFocusArea(event.target.value)}>
                    <option>Study habits</option>
                    <option>Time management</option>
                    <option>Exam preparation</option>
                </select>
            </div>
            {error && <p>{error}</p>}
            <div className="recommendations-list">
                {recommendations.length ? (
                    recommendations.map((recommendation, index) => (
                        <div key={index} className="page-section">
                            <p>{recommendation}</p>
                        </div>
                    ))
                ) : (
                    <p>No recommendations available yet.</p>
                )}
            </div>
        </div>
    );
};

export default Recommendations;
