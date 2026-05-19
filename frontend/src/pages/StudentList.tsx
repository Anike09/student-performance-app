import React, { useEffect, useState } from 'react';
import { fetchStudents } from '../services/api';
import { Student } from '../types';

const StudentList: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStudents = async () => {
            try {
                const data = await fetchStudents();
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Student List</h1>
            <ul>
                {students.map(student => (
                    <li key={student.id}>
                        {student.name} - GPA: {student.gpa}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;