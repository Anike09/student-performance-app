import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/gpa-analysis', label: 'GPA Analysis' },
  { path: '/recommendations', label: 'Recommendations' },
  { path: '/academic-record', label: 'Add Course' },
];

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-800/50 bg-slate-950/98 text-slate-100 shadow-2xl backdrop-blur-xl md:inset-y-0 md:left-0 md:top-0 md:w-80 md:border-r md:border-t-0 md:bg-slate-950">
      <div className="mx-auto flex h-full max-w-[320px] flex-col justify-between gap-6 px-5 py-5 md:px-6 md:py-8">
        <div className="space-y-6">
          <div className="rounded-[32px] bg-gradient-to-br from-indigo-600 via-cyan-500 to-slate-900 p-6 text-white shadow-soft">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/80">Academic Insights</p>
            <h1 className="mt-4 text-2xl font-semibold">Student Performance</h1>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              A modern analytics dashboard for GPA tracking, course review, and smart recommendations.
            </p>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                exact
                activeClassName="bg-cyan-500 text-slate-950 shadow-soft"
                className="flex items-center rounded-[28px] border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-500 hover:bg-slate-800 hover:text-white"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 text-sm text-slate-300 shadow-soft">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/75">Logged in as</p>
          <p className="mt-3 text-lg font-semibold text-white">{user?.username ?? 'Student User'}</p>
          <p className="mt-2 text-sm text-slate-400">Manage your session and quickly log out when finished.</p>
          <button
            onClick={logout}
            className="mt-5 w-full rounded-[28px] bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
