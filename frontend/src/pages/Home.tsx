import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-[32px] bg-white p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">Academic analytics</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">Student Performance Dashboard</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Track your GPA, manage academic records, and discover personalized recommendations with a modern analytics dashboard built for student success.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/dashboard" className="btn inline-flex items-center justify-center px-6 py-3">
              View Dashboard
            </Link>
            <Link to="/login" className="btn bg-white text-slate-900 inline-flex items-center justify-center px-6 py-3">
              Login
            </Link>
          </div>
        </div>

        <div className="rounded-[32px] bg-gradient-to-br from-indigo-600 via-cyan-500 to-slate-900 p-10 text-white shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-100/90">Modern academic portal</p>
          <h2 className="mt-4 text-3xl font-semibold">One view for your GPA, courses, and recommendations.</h2>
          <p className="mt-6 text-sm leading-7 text-cyan-100/85">
            Designed for final year projects and academic presentations, the dashboard is responsive, polished, and easy to use.
          </p>
          <div className="mt-8 grid gap-4">
            <div className="rounded-[28px] bg-white/10 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-100">GPA visibility</p>
              <p className="mt-3 text-sm text-white/90">Compare term performance with simple analytics.</p>
            </div>
            <div className="rounded-[28px] bg-white/10 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-100">Smart recommendations</p>
              <p className="mt-3 text-sm text-white/90">Receive the next best actions for stronger grades.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-[32px] bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Dashboard</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">Professional layout</h3>
          <p className="mt-4 text-sm leading-6 text-slate-600">A clean interface built with Tailwind, rounded cards, and modern spacing.</p>
        </div>
        <div className="rounded-[32px] bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Responsive</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">Optimized for every screen</h3>
          <p className="mt-4 text-sm leading-6 text-slate-600">The UI adapts gracefully to laptops, tablets, and mobile phones.</p>
        </div>
        <div className="rounded-[32px] bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Academic insights</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">Smart student analytics</h3>
          <p className="mt-4 text-sm leading-6 text-slate-600">Visualize GPA trends, grade distributions, and progress in one place.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
