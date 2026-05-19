import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudentProfile } from '../services/api';
import { StudentProfileType } from '../types';

const StudentProfile: React.FC = () => {
    const { studentId } = useParams<{ studentId: string }>();
    const [studentProfile, setStudentProfile] = useState<StudentProfileType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                const profile = await getStudentProfile(studentId || '');
                setStudentProfile(profile);
            } catch (err) {
                setError('Failed to fetch student profile');
            } finally {
                setLoading(false);
            }
        };

        if (studentId) {
            fetchStudentProfile();
        }
    }, [studentId]);

    if (loading) {
        return <div className="page"><p>Loading...</p></div>;
    }

    if (error) {
        return <div className="page"><p>{error}</p></div>;
    }

    if (!studentProfile) {
        return <div className="page"><p>No profile found</p></div>;
    }

    return (
        <div className="page student-profile-page">
            <h1>{studentProfile.name}</h1>
            <p><strong>ID:</strong> {studentProfile.id}</p>
            <p><strong>Email:</strong> {studentProfile.email || 'Not provided'}</p>
            {studentProfile.matricNo && (
                <p><strong>Matric No:</strong> {studentProfile.matricNo}</p>
            )}
            <section>
                <h2>Performance Overview</h2>
                <ul>
                    {studentProfile.grades.map((grade) => (
                        <li key={`${grade.courseCode || grade.subject}-${grade.semester || ''}`}>
                            {grade.courseCode || grade.subject}: {grade.score} {grade.semester && `(${grade.semester})`}
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Recommendations</h2>
                <ul>
                    {(studentProfile.recommendations || []).map((rec, index) => (
                        <li key={index}>{rec}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default StudentProfile;