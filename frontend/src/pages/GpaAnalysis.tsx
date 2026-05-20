import React, { useEffect, useState } from 'react';
import { getStudents, getPerformanceAnalysis } from '../services/api';
import { Student, AnalysisResult } from '../types';

const GpaAnalysis: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudentId, setSelectedStudentId] = useState<string>('');
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStudents = async () => {
            try {
                const studentData = await getStudents();
                setStudents(studentData);
                if (studentData.length) {
                    setSelectedStudentId(String(studentData[0].id));
                }
            } catch (err) {
                setError('Unable to load student list.');
            }
        };
        loadStudents();
    }, []);

    useEffect(() => {
        const loadAnalysis = async () => {
            if (!selectedStudentId) return;
            try {
                const result = await getPerformanceAnalysis(selectedStudentId);
                setAnalysis(result);
            } catch (err) {
                setError('Failed to calculate GPA.');
            }
        };
        loadAnalysis();
    }, [selectedStudentId]);

    return (
        <div className="page gpa-page">
            <h1>GPA Analysis</h1>
            <p>Select a student to view GPA analysis based on their academic record.</p>
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
            {error && <p>{error}</p>}
            {analysis && (
                <div className="page-section">
                    <h2>Results</h2>
                    <p>Estimated GPA: <strong>{analysis.gpa}</strong></p>
                    <p>Total Grades: {analysis.totalGrades}</p>
                    <p>Total Points: {analysis.totalPoints}</p>
                </div>
            )}
        </div>
    );
};

export default GpaAnalysis;
