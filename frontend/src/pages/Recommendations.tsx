import React, { useEffect, useState } from 'react';
import { getStudents, getRecommendations } from '../services/api';
import { Student } from '../types';
import RecommendationCard from '../components/RecommendationCard';

const Recommendations: React.FC = () => {
  const [focusArea, setFocusArea] = useState('Study habits');
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
        if (data.length) setSelectedStudentId(String(data[0].id));
      } catch (err) {
        setError('Could not load students for recommendations.');
      }
    };
    loadStudents();
  }, []);

  useEffect(() => {
    const loadRecommendations = async () => {
      if (!selectedStudentId) return;
      try {
        const data = await getRecommendations(selectedStudentId);
        setRecommendations(data.recommendations || []);
      } catch (err) {
        setError('Unable to fetch recommendations.');
      }
    };
    loadRecommendations();
  }, [selectedStudentId]);

  return (
    <div className="space-y-8 pb-10">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="grid gap-4 sm:grid-cols-[1.4fr_0.9fr] sm:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">Recommendations</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Tailored academic guidance</h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">Review curated suggestions based on student performance and focus areas.</p>
          </div>
          <div className="rounded-[32px] bg-slate-50 p-6 text-slate-900">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Focus area</p>
            <p className="mt-3 text-lg font-semibold">{focusArea}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-6 rounded-[28px] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Select student</p>
            <div className="mt-4 space-y-4">
              <label className="block text-sm font-semibold text-slate-700" htmlFor="studentSelect">
                Student
              </label>
              <select
                id="studentSelect"
                value={selectedStudentId}
                onChange={(event) => setSelectedStudentId(event.target.value)}
                className="w-full rounded-[24px] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
              >
                <option value="">Choose a student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6 space-y-4">
              <label className="block text-sm font-semibold text-slate-700">Focus area</label>
              <select
                value={focusArea}
                onChange={(event) => setFocusArea(event.target.value)}
                className="w-full rounded-[24px] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
              >
                <option>Study habits</option>
                <option>Time management</option>
                <option>Exam preparation</option>
              </select>
            </div>
          </div>

          {error && <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Why recommendations matter</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">Use personalized feedback to improve study habits, manage time better, and raise grades with the right next steps.</p>
        </div>
      </section>

      <section className="grid gap-6">
        {recommendations.length ? (
          recommendations.map((recommendation, index) => (
            <RecommendationCard key={`${recommendation}-${index}`} title={`Recommendation ${index + 1}`} description={recommendation} />
          ))
        ) : (
          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 text-slate-600 shadow-soft">No recommendations available yet.</div>
        )}
      </section>
    </div>
  );
};

export default Recommendations;
