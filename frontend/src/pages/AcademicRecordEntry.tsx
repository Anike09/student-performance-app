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
    <div className="space-y-8 pb-10">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="grid gap-4 sm:grid-cols-[1.4fr_0.9fr] sm:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">Academic entry</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Submit course results</h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">Enter new academic records to keep student profiles updated and accurate.</p>
          </div>
          <div className="rounded-[32px] bg-slate-50 p-6 text-slate-900">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Quick tips</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">Use accurate scores and select the correct semester to ensure analytics remain precise.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                <label htmlFor="studentId" className="block text-sm font-semibold text-slate-700">
                  Student
                </label>
                <select
                  id="studentId"
                  value={studentId}
                  onChange={(event) => setStudentId(event.target.value)}
                  className="w-full rounded-[24px] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                >
                  <option value="">Select student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                <label htmlFor="semester" className="block text-sm font-semibold text-slate-700">
                  Semester
                </label>
                <input
                  id="semester"
                  type="text"
                  value={semester}
                  onChange={(event) => setSemester(event.target.value)}
                  className="w-full rounded-[24px] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-3 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                <label htmlFor="courseCode" className="block text-sm font-semibold text-slate-700">
                  Course Code
                </label>
                <input
                  id="courseCode"
                  type="text"
                  value={courseCode}
                  onChange={(event) => setCourseCode(event.target.value)}
                  placeholder="E.g. CSC101"
                  className="w-full rounded-[24px] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                />
              </div>

              <div className="space-y-3 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                <label htmlFor="units" className="block text-sm font-semibold text-slate-700">
                  Units
                </label>
                <input
                  id="units"
                  type="number"
                  min={1}
                  value={units}
                  onChange={(event) => setUnits(Number(event.target.value))}
                  className="w-full rounded-[24px] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                />
              </div>

              <div className="space-y-3 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                <label htmlFor="score" className="block text-sm font-semibold text-slate-700">
                  Score
                </label>
                <input
                  id="score"
                  type="number"
                  min={0}
                  max={100}
                  value={score}
                  onChange={(event) => setScore(Number(event.target.value))}
                  className="w-full rounded-[24px] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-[28px] bg-indigo-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Submit Record
            </button>
          </form>

          {message && <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">{message}</div>}
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">Submission notes</p>
          <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
            <li>• Double-check the student selection before hitting submit.</li>
            <li>• Use the correct semester label for accurate analytics.</li>
            <li>• Ensure course codes are formatted consistently.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AcademicRecordEntry;
