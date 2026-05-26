import React, { useEffect, useMemo, useState } from 'react';
import { getStudents, getPerformanceAnalysis } from '../services/api';
import { Student, AnalysisResult } from '../types';
import DashboardCard from '../components/DashboardCard';
import RecommendationCard from '../components/RecommendationCard';
import CourseTable from '../components/CourseTable';
import AnalyticsChartCard from '../components/AnalyticsChartCard';
import GpaTrendChart from '../components/GpaTrendChart';
import SemesterPerformanceChart from '../components/SemesterPerformanceChart';
import GradeDistributionChart from '../components/GradeDistributionChart';

const DashboardPage: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const students = await getStudents();
        if (students.length) {
          setSelectedStudent(students[0]);
          const result = await getPerformanceAnalysis(String(students[0].id));
          setAnalysis(result);
        }
      } catch (err) {
        setError('Unable to load dashboard information.');
      }
    };

    loadData();
  }, []);

  const courseRows = useMemo(
    () =>
      analysis?.courses || [
        { code: 'CSC101', title: 'Programming Fundamentals', semester: 'Fall 2025', credits: 3, grade: 'A-', status: 'Passed' },
        { code: 'MTH112', title: 'Calculus II', semester: 'Fall 2025', credits: 4, grade: 'B+', status: 'Passed' },
        { code: 'PHY110', title: 'Physics for Engineers', semester: 'Fall 2025', credits: 3, grade: 'C', status: 'Passed' },
        { code: 'ENG105', title: 'Academic Writing', semester: 'Fall 2025', credits: 2, grade: 'B', status: 'Passed' },
        { code: 'HIS120', title: 'Modern History', semester: 'Spring 2026', credits: 2, grade: 'D+', status: 'Failed' },
      ],
    [analysis]
  );

  const currentGpa = analysis?.gpa ?? 3.38;
  const currentCgpa = analysis?.cgpa ?? 3.45;
  const totalCourses = analysis?.courseCount ?? courseRows.length;
  const failedCourses = analysis?.failedCourses ?? courseRows.filter((course) => course.status.toLowerCase() === 'failed').length;

  const recommendations = analysis?.recommendations || [
    { title: 'Improve time management', description: 'Start each week with a study schedule and dedicate focused blocks for critical topics.' },
    { title: 'Review weak subjects', description: 'Revisit the materials for courses below B and complete a short weekly practice review.' },
    { title: 'Stay consistent', description: 'Attend review sessions and keep your notes organized to stay ahead of deadlines.' },
    { title: 'Use peer study groups', description: 'Collaborate with classmates to strengthen understanding on difficult topics.' },
  ];

  const gpaTrendData = [
    { term: 'Fall 2024', gpa: 3.15 },
    { term: 'Spring 2025', gpa: 3.38 },
    { term: 'Fall 2025', gpa: 3.52 },
    { term: 'Spring 2026', gpa: 3.45 },
    { term: 'Summer 2026', gpa: 3.62 },
  ];

  const semesterPerformanceData = [
    { semester: 'Fall 2024', performance: 78 },
    { semester: 'Spring 2025', performance: 82 },
    { semester: 'Fall 2025', performance: 88 },
    { semester: 'Spring 2026', performance: 84 },
  ];

  const gradeDistributionData = [
    { grade: 'A', count: 12 },
    { grade: 'B', count: 9 },
    { grade: 'C', count: 5 },
    { grade: 'D', count: 2 },
    { grade: 'F', count: 1 },
  ];

  return (
    <div className="space-y-8 pb-10">
      <section className="grid gap-6 rounded-[32px] border border-slate-200 bg-gradient-to-br from-indigo-600 via-cyan-600 to-slate-800 p-8 text-white shadow-soft">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-100/90">Academic dashboard</p>
            <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Student Performance Dashboard</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-cyan-100/85 sm:text-base">
              Monitor GPA, course progress, and recommendations with a clean, modern analytics experience designed for academic success.
            </p>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/10 p-6 text-slate-100 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">Welcome back</p>
            <p className="mt-3 text-2xl font-semibold">{selectedStudent?.name ?? 'Student'}</p>
            <p className="mt-3 text-sm leading-6 text-cyan-100/80">Your performance snapshot is ready. Review your study goals and follow the recommended actions.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-4">
        <DashboardCard title="Current GPA" value={currentGpa.toFixed(2)} detail="Measured across the latest term" accent="indigo" />
        <DashboardCard title="Current CGPA" value={currentCgpa.toFixed(2)} detail="Cumulative performance score" accent="cyan" />
        <DashboardCard title="Total Courses" value={totalCourses} detail="Active courses this semester" accent="slate" />
        <DashboardCard title="Failed Courses" value={failedCourses} detail="Areas requiring improvement" accent="rose" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <AnalyticsChartCard title="GPA Trend" subtitle="Term-by-term performance">
          <GpaTrendChart data={gpaTrendData} />
        </AnalyticsChartCard>

        <div className="grid gap-6">
          <AnalyticsChartCard title="Semester Performance" subtitle="Course scores by term">
            <SemesterPerformanceChart data={semesterPerformanceData} />
          </AnalyticsChartCard>

          <AnalyticsChartCard title="Grade Distribution" subtitle="Overall grade breakdown">
            <GradeDistributionChart data={gradeDistributionData} />
            <div className="mt-6 grid gap-2 text-sm text-slate-600">
              {gradeDistributionData.map((entry, index) => (
                <div key={entry.grade} className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
                  <span className="font-medium text-slate-900">{entry.grade}</span>
                  <span className="text-slate-500">{entry.count} courses</span>
                </div>
              ))}
            </div>
          </AnalyticsChartCard>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Course progress</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Current course load</h2>
            </div>
            <div className="inline-flex rounded-3xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Updated just now</div>
          </div>
          <CourseTable rows={courseRows} />
        </div>

        <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Recommendations</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Smart study actions</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Personalized guidance to help you stay on track and strengthen course outcomes.</p>
          </div>
          <div className="space-y-4">
            {recommendations.map((item) => (
              <RecommendationCard key={item.title} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Insights</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">Course risk and performance summary</h2>
          </div>
          <div className="text-sm text-slate-600">Review key actions and keep progress moving forward.</div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Active study focus</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">Reading, note taking, and revision planning.</p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Next action</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">Schedule review sessions for weak courses this week.</p>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-[32px] border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">{error}</div>
      )}
    </div>
  );
};

export default DashboardPage;
