import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStudents, getPerformanceAnalysis } from '../services/api';
import { Student, AnalysisResult } from '../types';
import GradeChart from '../components/GradeChart';

const DashboardPage: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStudents = async () => {
            try {
                const data = await getStudents();
                setStudents(data);
                if (data.length) {
                    setSelectedStudent(data[0]);
                }
            } catch (err) {
                setError('Unable to load student dashboard data.');
            }
        };
        loadStudents();
    }, []);

    useEffect(() => {
        const loadAnalysis = async () => {
            if (!selectedStudent) return;
            try {
                const result = await getPerformanceAnalysis(String(selectedStudent.id));
                setAnalysis(result);
            } catch (err) {
                setError('Failed to fetch analysis.');
            }
        };
        loadAnalysis();
    }, [selectedStudent]);

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
            {error && <div className="page-section"><p>{error}</p></div>}
            <div className="page-section">
                <label htmlFor="studentSelect">Select student</label>
                <select
                    id="studentSelect"
                    value={selectedStudent?.id || ''}
                    onChange={(event) => {
                        const student = students.find((item) => item.id === Number(event.target.value));
                        setSelectedStudent(student || null);
                    }}
                >
                    <option value="">Choose a student</option>
                    {students.map((student) => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>
            </div>
            {selectedStudent && analysis && (
                <div className="dashboard-widgets">
                    <div className="page-section">
                        <h2>{selectedStudent.name}'s GPA</h2>
                        <p>Estimated GPA: {analysis.gpa}</p>
                        <p>Total Grades: {analysis.totalGrades}</p>
                    </div>
                    <GradeChart
                        grades={analysis.performanceTrends.map((item) => item.value)}
                        labels={analysis.performanceTrends.map((item) => item.label)}
                    />
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
