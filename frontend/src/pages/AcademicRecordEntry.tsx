import React, { useEffect, useState } from 'react';
import { getStudents, submitGrade } from '../services/api';
import { Student } from '../types';

const AcademicRecordEntry: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [studentId, setStudentId] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [units, setUnits] = useState(3);
    const [score, setScore] = useState(0);
    const [semester, setSemester] = useState('Fall 2025');
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const loadStudents = async () => {
            try {
                const data = await getStudents();
                setStudents(data);
                if (data.length) setStudentId(String(data[0].id));
            } catch (err) {
                setMessage('Unable to load student options.');
            }
        };
        loadStudents();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setMessage(null);

        if (!studentId || !courseCode) {
            setMessage('Please choose a student and add a course code.');
            return;
        }

        try {
            await submitGrade(studentId, { courseCode, units, score, semester });
            setMessage('Academic record submitted successfully.');
            setCourseCode('');
            setUnits(3);
            setScore(0);
            setSemester('Fall 2025');
        } catch (err) {
            setMessage('Unable to submit academic record.');
        }
    };

    return (
        <div className="page academic-entry-page">
            <h1>Academic Record Entry</h1>
            <p>Submit new academic results to keep your profile up to date.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="studentId">Student</label>
                    <select id="studentId" value={studentId} onChange={(event) => setStudentId(event.target.value)}>
                        <option value="">Select student</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="courseCode">Course Code</label>
                    <input
                        id="courseCode"
                        type="text"
                        value={courseCode}
                        onChange={(event) => setCourseCode(event.target.value)}
                        placeholder="Enter course code"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="units">Units</label>
                    <input
                        id="units"
                        type="number"
                        min={1}
                        value={units}
                        onChange={(event) => setUnits(Number(event.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="score">Score</label>
                    <input
                        id="score"
                        type="number"
                        min={0}
                        max={100}
                        value={score}
                        onChange={(event) => setScore(Number(event.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="semester">Semester</label>
                    <input
                        id="semester"
                        type="text"
                        value={semester}
                        onChange={(event) => setSemester(event.target.value)}
                    />
                </div>
                <button type="submit" className="button">
                    Submit Record
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default AcademicRecordEntry;
