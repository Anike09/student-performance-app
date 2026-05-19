import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStudents } from '../services/api';
import { Student } from '../types';

const StudentList: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStudents = async () => {
            try {
                const data = await getStudents();
                setStudents(data);
            } catch (err) {
                setError('Failed to load students');
            } finally {
                setLoading(false);
            }
        };

        loadStudents();
    }, []);

    if (loading) {
        return <div className="page"><p>Loading students...</p></div>;
    }

    if (error) {
        return <div className="page"><p>{error}</p></div>;
    }

    return (
        <div className="page student-list-page">
            <h1>Student List</h1>
            <ul className="student-list">
                {students.map(student => (
                    <li key={student.id}>
                        <Link to={`/students/${student.id}`}>
                            {student.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;