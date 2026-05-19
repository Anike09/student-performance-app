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
                const profile = await getStudentProfile(studentId);
                setStudentProfile(profile);
            } catch (err) {
                setError('Failed to fetch student profile');
            } finally {
                setLoading(false);
            }
        };

        fetchStudentProfile();
    }, [studentId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!studentProfile) {
        return <div>No profile found</div>;
    }

    return (
        <div>
            <h1>{studentProfile.name}</h1>
            <p>Student ID: {studentProfile.id}</p>
            <h2>Performance Overview</h2>
            <ul>
                {studentProfile.grades.map((grade) => (
                    <li key={grade.subject}>
                        {grade.subject}: {grade.score}
                    </li>
                ))}
            </ul>
            <h2>Recommendations</h2>
            <ul>
                {studentProfile.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudentProfile;