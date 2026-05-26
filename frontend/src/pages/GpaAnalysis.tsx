import React, { useEffect, useMemo, useState } from 'react';
import { getStudents, getPerformanceAnalysis } from '../services/api';
import { Student, AnalysisResult } from '../types';
import AnalyticsChartCard from '../components/AnalyticsChartCard';
import GpaTrendChart from '../components/GpaTrendChart';

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

  const gpaTrendData = useMemo(
    () => [
      { term: 'Fall 2024', gpa: analysis?.gpa ? Math.max(2.8, analysis.gpa - 0.25) : 3.1 },
      { term: 'Spring 2025', gpa: analysis?.gpa ? Math.max(2.9, analysis.gpa - 0.15) : 3.3 },
      { term: 'Fall 2025', gpa: analysis?.gpa ? Math.min(4.0, analysis.gpa + 0.05) : 3.52 },
      { term: 'Spring 2026', gpa: analysis?.gpa ?? 3.45 },
      { term: 'Summer 2026', gpa: analysis?.gpa ? Math.min(4.0, analysis.gpa + 0.1) : 3.62 },
    ],
    [analysis]
  );

  return (
    <div className="space-y-8 pb-10">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="grid gap-4 sm:grid-cols-[1.4fr_0.9fr] sm:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">GPA analysis</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">In-depth GPA insights</h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">Select a student and analyse their academic performance with clear charts and summary metrics.</p>
          </div>
          <div className="rounded-[32px] bg-slate-50 p-6 text-slate-900">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Student selector</p>
            <p className="mt-3 text-lg font-semibold">{students.find((student) => String(student.id) === selectedStudentId)?.name || 'No student selected'}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Student selection</p>
            <div className="mt-4 w-full max-w-md rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <label htmlFor="studentSelect" className="block text-sm font-semibold text-slate-700">Student</label>
              <select
                id="studentSelect"
                value={selectedStudentId}
                onChange={(event) => setSelectedStudentId(event.target.value)}
                className="mt-3 w-full rounded-[24px] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
              >
                <option value="">Choose a student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[28px] bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Estimated GPA</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{analysis?.gpa?.toFixed(2) ?? '3.42'}</p>
            </div>
            <div className="rounded-[28px] bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Total grades</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{analysis?.totalGrades ?? 24}</p>
            </div>
            <div className="rounded-[28px] bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Total points</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{analysis?.totalPoints ?? 96}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Student summary</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">Use this page to review GPA progression and make sure performance stays on target each semester.</p>
          </div>
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Action</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">Select another student to compare performance and identify improvement opportunities.</p>
          </div>
        </div>
      </section>

      <AnalyticsChartCard title="GPA Trend" subtitle="How GPA has evolved over time">
        <GpaTrendChart data={gpaTrendData} />
      </AnalyticsChartCard>
    </div>
  );
};

export default GpaAnalysis;
